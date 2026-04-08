from flask import request, flash, jsonify
from app import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import Applicant, Application, Program, Student, Course, Section, Enroll, Assistantship
from flask_api import status
from datetime import datetime
from sqlalchemy import func

def hash_password(password):
    return generate_password_hash(password)

def check_password(password,password_hash):
    return check_password_hash(password,password_hash)

@app.route('/')
@app.route('/index')
def index():
    return "Hello world"

@app.route('/login',methods=['POST'])
def login():
    try:
        applicant = Applicant.query.filter_by(email = request.json['email']).first()
        if applicant is None or not check_password(applicant.password,request.json['password']):
            return jsonify({'status': status.HTTP_401_UNAUTHORIZED,'message':'Invalid Credentials'})
        else:
            return jsonify({'status': status.HTTP_200_OK,'message':'Login successful','aid':applicant.aid})
    except:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to login'})

@app.route('/register',methods=['POST'])
def register():
    try:
        applicant = Applicant.query.filter_by(email = request.json['email']).first()
        if applicant is None:
            password = hash_password(request.json['password'])
            applicant = Applicant(email=request.json['email'],fname=request.json['fname'],lname=request.json['lname'],password=password)
            db.session.add(applicant)
            db.session.commit()
            return jsonify({'status': status.HTTP_201_CREATED,'message':'Congratulations, you are now a registered user'})
        else:
            return jsonify({'status': status.HTTP_409_CONFLICT,'message':'Please use a different email'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})
        # return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to register'})

@app.route('/edit_profile',methods=['POST'])
def edit_profile():
    try:
        applicant = Applicant.query.filter_by(aid = request.json['aid']).first()
        if applicant is not None:
            applicant.fname = request.json['fname']
            applicant.lname = request.json['lname']
            if 'password' in request.json.keys():
                password = hash_password(request.json['password'])
                applicant.password = password
            applicant.address1 = request.json['address1']
            applicant.address2 = request.json['address2']
            applicant.city = request.json['city']
            applicant.state = request.json['state']
            applicant.zip = int(request.json['zip'])
            applicant.GREQ = int(request.json['GREQ'])
            applicant.GREV = int(request.json['GREV'])
            applicant.GREA = float(request.json['GREA'])
            applicant.TOEFL = int(request.json['TOEFL'])

            db.session.add(applicant)
            db.session.commit()

            return jsonify({'status': status.HTTP_200_OK,'message':'Your profile updated successfully'})
        else:
            return jsonify({'status': status.HTTP_404_NOT_FOUND,'message':'Applicant Not found'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})
        # return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to Edit Profile'})

@app.route('/apply',methods=['POST'])
def apply():
    try:
        applicant = Applicant.query.filter_by(aid = request.json['aid']).first()
        if applicant is not None:
            application = Application.query.filter_by(email = applicant.email).first()
            if application is None:
                program = Program.query.filter_by(program = request.json['program']).first()
                application = Application(
                    email = applicant.email,
                    university = 'GSU',
                    dname = request.json['dname'],
                    program = program.program,
                    dateOfApp = datetime.utcnow(),
                    termOfAdmission = request.json['termOfAdmission'],
                    yearOfAdmission = request.json['yearOfAdmission'],
                    admissionStatus = 'PENDING',
                    dataSentToPaws = 'NO',
                    applicant_email = applicant.email,
                    applicant_program = program.program
                )

                db.session.add(application)
                db.session.commit()

                return jsonify({'status': status.HTTP_201_CREATED,'message':'Your application sent successfully'})
            else:
                return jsonify({'status': status.HTTP_200_OK,'message':'Looks like you have already applied.'})
        else:
            return jsonify({'status':status.HTTP_404_NOT_FOUND,'message':'Applicant not found'})
    except Exception as e:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})
        # return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to apply'})

@app.route('/update_status',methods=['PUT'])
def update_status():
    try:
        application = Application.query.filter_by(email = request.json['email']).first()
        if application is not None:
            application.admissionStatus = request.json['admissionStatus']
            
            db.session.add(application)
            db.session.commit()

            return jsonify({'status': status.HTTP_201_CREATED,'message':'Application status updated'})
        else:
            return jsonify({'status':status.HTTP_200_OK,'message':'Application not found'})
    except:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to change status'})

@app.route('/get_accepted_applications',methods=['GET'])        
def get_accepted_applications():     
    try:
        return_data = []
        applications = db.session.query(Applicant,Application).filter(Applicant.email == Application.email).filter(Application.admissionStatus == 'ACCEPT',Application.university == 'GSU').all()
        if applications is not None:
            for application in applications:
                application_data = {}
                application_data['email'] = application.Application.email
                application_data['fname'] = application.Applicant.fname
                application_data['lname'] = application.Applicant.lname
                application_data['address1'] = application.Applicant.address1
                application_data['address2'] = application.Applicant.address2
                application_data['city'] = application.Applicant.city
                application_data['state'] = application.Applicant.state
                application_data['zip'] = application.Applicant.zip
                application_data['sType'] = application.Application.program
                application_data['majorDept'] = application.Application.dname
                return_data.append(application_data)
            return jsonify({'status':status.HTTP_200_OK,'data':return_data})
    except Exception as e:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})
        # return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to get applications'})

@app.route('/get_all_applications',methods=['GET'])        
def get_all_applications():     
    try:
        return_data = []
        applications = db.session.query(Applicant,Application).filter(Applicant.email == Application.email).filter(Application.university == 'GSU').add_columns(Application.email,Applicant.aid,Applicant.fname,Applicant.lname,Application.dateOfApp,Application.admissionStatus).all()
        if applications is not None:
            for application in applications:
                application_data = {}
                application_data['email'] = application[2]
                application_data['aid'] = application[3]
                application_data['fname'] = application[4]
                application_data['lname'] = application[5]
                application_data['dateOfApp'] = application[6]
                application_data['admissionStatus'] = application[7]
                return_data.append(application_data)
            return jsonify({'status':status.HTTP_200_OK,'data':return_data})
    except Exception as e:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})
        # return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to get applications'})

@app.route('/<applicantID>/fetch_profile',methods=['GET'])
def fetch_profile(applicantID):
    try:
        applicant = Applicant.query.filter_by(aid = applicantID).first()
        return_data = {}
        if applicant is not None:
            return_data['email'] = applicant.email
            return_data['fname'] = applicant.fname
            return_data['lname'] = applicant.lname
            return_data['address1'] = applicant.address1
            return_data['address2'] = applicant.address2
            return_data['city'] = applicant.city
            return_data['state'] = applicant.state
            return_data['zip'] = applicant.zip
            return_data['GREQ'] = applicant.GREQ
            return_data['GREV'] = applicant.GREV
            return_data['GREA'] = applicant.GREA
            return_data['TOEFL'] = applicant.TOEFL
            return jsonify({'status':status.HTTP_200_OK,'data':return_data})
        else:
            return jsonify({'status':status.HTTP_200_OK,'message':'Applicant not found'})
    except:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to fetch Applicant profile'})

@app.route('/<applicantID>/fetch_application',methods=['GET'])
def fetch_application(applicantID):
    try:
        application = db.session.query(Applicant,Application).filter(Applicant.email == Application.email).filter(Applicant.aid == applicantID).first()
        return_data = {}
        if application is not None:
            return_data['email'] = application.Applicant.email
            return_data['fname'] = application.Applicant.fname
            return_data['lname'] = application.Applicant.lname
            return_data['address1'] = application.Applicant.address1
            return_data['address2'] = application.Applicant.address2
            return_data['city'] = application.Applicant.city
            return_data['state'] = application.Applicant.state
            return_data['zip'] = application.Applicant.zip
            return_data['GREQ'] = application.Applicant.GREQ
            return_data['GREV'] = application.Applicant.GREV
            return_data['GREA'] = application.Applicant.GREA
            return_data['TOEFL'] = application.Applicant.TOEFL
            return_data['university'] = application.Application.university
            return_data['dname'] = application.Application.dname
            return_data['program'] = application.Application.program
            return_data['dateOfApp'] = application.Application.dateOfApp
            return_data['termOfAdmission'] = application.Application.termOfAdmission
            return_data['yearOfAdmission'] = application.Application.yearOfAdmission
            return_data['admissionStatus'] = application.Application.admissionStatus
            return jsonify({'status':status.HTTP_200_OK,'data':return_data})
        else:
            return jsonify({'status':status.HTTP_200_OK,'message':'Application not found'})
    except:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'Unable to fetch Application'})

@app.route('/getstats',methods=['POST'])        
def getstats():       
    try:
        
        termOfAdmission= request.json['termOfAdmission']
        yearOfAdmission=request.json['yearOfAdmission']
        #return_data = []
        statistics = db.session.query(Application.dname,Application.program,Application.admissionStatus, func.count(Application.admissionStatus).label('Count of Status')).filter(Application.university == 'GSU', Application.termOfAdmission == termOfAdmission , Application.yearOfAdmission == yearOfAdmission).group_by(Application.dname,Application.program,Application.admissionStatus).all()
        if statistics is not None:
            def fill_dict(p,v,total,total_department):
                course = v.pop(0)
                if course not in p:
                  total = 0  
                  num = {}
                  num[v[0]]=v[1] 
                  p[course]=num 
                else:  
                  p[course][v[0]] = v[1]
                  
                total+=int(v[1])
                total_department+=int(v[1])
                p[course]['total_'+course]=total
                return p,total,total_department
                 
            d = {}
            total_program = 0
            total_department = 0
            print(statistics) 
            for k, *v in statistics:
                if k not in d:
                  p={}  
                  total_department = 0
                  d[k]=p
                  d[k]['total_department']=total_department
                p,total_program,total_department = fill_dict(p,v,total_program,total_department)
                d[k]['total_department']=total_department
            d = [{k:v} for(k,v) in d.items()]
            return jsonify({'status':status.HTTP_200_OK,'data':d})
    except Exception as e:
        return jsonify({'status':status.HTTP_500_INTERNAL_SERVER_ERROR,'message':str(e)})


# ── PAWS routes ────────────────────────────────────────────────────────────────

@app.route('/paws/login', methods=['POST'])
def paws_login():
    try:
        student = Student.query.filter_by(email=request.json['email']).first()
        if student is None or not check_password(student.password, request.json['password']):
            return jsonify({'status': status.HTTP_401_UNAUTHORIZED, 'message': 'Invalid Credentials'})
        return jsonify({'status': status.HTTP_200_OK, 'message': 'Login successful', 'sid': student.sid})
    except:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': 'Unable to login'})

@app.route('/paws/registration', methods=['POST'])
def paws_registration():
    try:
        for data in request.json:
            existing = Student.query.filter_by(email=data['email']).first()
            if existing is None:
                password = hash_password(data['fname'] + data['lname'])
                student = Student(
                    email=data['email'], fname=data['fname'], lname=data['lname'],
                    password=password, address1=data['address1'], address2=data['address2'],
                    city=data['city'], state=data['state'], zip=int(data['zip']),
                    sType=data['sType'], majorDept=data['majorDept'], gradAssistant='N'
                )
                db.session.add(student)
                db.session.commit()
        return jsonify({'status': status.HTTP_200_OK, 'message': 'Registered Successfully'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/get_all_courses', methods=['POST'])
def paws_get_all_courses():
    try:
        term = request.json['term']
        course_details = db.session.query(Course, Section).filter(Course.cno == Section.course_cpcrn).filter(Section.term == term).all()
        return_data = []
        for c in course_details:
            return_data.append({
                'crn': c.Section.crn, 'cprefix': c.Section.cprefix, 'cno': c.Course.cno,
                'ctitle': c.Course.ctitle, 'chours': c.Course.chours, 'days': c.Section.days,
                'starttime': c.Section.starttime, 'endtime': c.Section.endtime,
                'room': c.Section.room, 'cap': c.Section.cap, 'instructor': c.Section.instructor
            })
        return jsonify({'status': status.HTTP_200_OK, 'data': return_data})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/modify_enrollment', methods=['POST'])
def paws_modify_enrollment():
    try:
        student = Student.query.filter_by(sid=request.json['sid']).first()
        term = request.json['term']
        if student is not None:
            Enroll.query.filter_by(sid=student.sid).filter_by(term=term).delete()
            for course in request.json['courses']:
                section = Section.query.filter_by(crn=course['crn']).first()
                enroll = Enroll(
                    sid=student.sid, term=term, year=2019, crn=course['crn'],
                    grade='', student_sid=student.sid, section_tyc=section.crn
                )
                db.session.add(enroll)
                db.session.commit()
            return jsonify({'status': status.HTTP_200_OK, 'message': 'Enrollment saved successfully!'})
        return jsonify({'status': status.HTTP_404_NOT_FOUND, 'message': 'Student record not found!'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/<studentID>/get_schedule')
def paws_get_schedule(studentID):
    try:
        student = Student.query.filter_by(sid=studentID).first()
        return_data = []
        if student is not None:
            enrollments = db.session.query(Enroll, Section).filter(Section.crn == Enroll.crn).filter(Enroll.sid == student.sid).all()
            for enroll in enrollments:
                course = Course.query.filter_by(cno=enroll.Section.cno).first()
                return_data.append({
                    'crn': enroll.Enroll.crn, 'term': enroll.Enroll.term, 'grade': enroll.Enroll.grade,
                    'year': enroll.Enroll.year, 'days': enroll.Section.days, 'cprefix': enroll.Section.cprefix,
                    'ctitle': course.ctitle if course else '', 'starttime': enroll.Section.starttime,
                    'endtime': enroll.Section.endtime, 'room': enroll.Section.room, 'instructor': enroll.Section.instructor
                })
        return jsonify({'status': status.HTTP_200_OK, 'data': return_data})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/get_courses', methods=['POST'])
def paws_get_courses():
    try:
        req_course = request.json['course']
        courses = db.session.query(Course).filter(Course.cprefix == req_course).add_columns(Course.cprefix, Course.cno, Course.ctitle, Course.chours).all()
        return_data = [{'cprefix': c[1], 'cno': c[2], 'ctitle': c[3], 'chours': c[4]} for c in courses]
        return jsonify({'status': status.HTTP_200_OK, 'data': return_data})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/get_enroll', methods=['POST'])
def paws_get_enroll():
    try:
        dept = request.json['department']
        enrolls = db.session.query(Student, Enroll).filter(Student.sid == Enroll.sid).filter(Student.majorDept == dept).add_columns(Enroll.sid, Enroll.term, Enroll.year, Enroll.crn).all()
        return_data = [{'sid': e[2], 'term': e[3], 'year': e[4], 'crn': e[5]} for e in enrolls]
        return jsonify({'status': status.HTTP_200_OK, 'data': return_data})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/get_students', methods=['POST'])
def paws_get_students():
    try:
        dept = request.json['majorDept']
        students = db.session.query(Student).filter(Student.majorDept == dept).add_columns(Student.sid, Student.email, Student.fname, Student.lname).all()
        return_data = [{'sid': s[1], 'email': s[2], 'fname': s[3], 'lname': s[4]} for s in students]
        return jsonify({'status': status.HTTP_200_OK, 'data': return_data})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/paws/update_grade', methods=['PUT'])
def paws_update_grade():
    try:
        enroll = Enroll.query.filter_by(sid=request.json['sid'], term=request.json['term'], year=request.json['year'], crn=request.json['crn']).first()
        if enroll is not None:
            enroll.grade = request.json['grade']
            db.session.add(enroll)
            db.session.commit()
            return jsonify({'status': status.HTTP_201_CREATED, 'message': 'Grade updated successfully'})
        return jsonify({'status': status.HTTP_200_OK, 'message': 'Enrollment not found'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})


# ── OGMS routes ────────────────────────────────────────────────────────────────

@app.route('/ogms/assign_assistantship', methods=['POST'])
def assign_assistantship():
    try:
        assistantship = Assistantship.query.filter_by(sid=request.json['sid']).first()
        if assistantship is None:
            assist = Assistantship(
                sid=int(request.json['sid']), term=request.json['term'],
                year=int(request.json['year']), amount=10000
            )
            db.session.add(assist)
            db.session.commit()
            return jsonify({'status': status.HTTP_201_CREATED, 'message': 'Assistantship awarded successfully'})
        return jsonify({'status': status.HTTP_200_OK, 'message': 'Assistantship already exists for this student'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})

@app.route('/ogms/view_fees', methods=['POST'])
def view_fees():
    try:
        sid = int(request.json['sid'])
        assistantship = Assistantship.query.filter_by(sid=sid).first()
        if assistantship is not None:
            return jsonify({'status': status.HTTP_200_OK, 'amount': assistantship.amount, 'message': 'Assistantship awarded'})
        return jsonify({'status': status.HTTP_404_NOT_FOUND, 'amount': 0, 'message': 'No Assistantship'})
    except Exception as e:
        return jsonify({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': str(e)})