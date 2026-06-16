import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''Приём онлайн-записей клиентов клиники и выдача списка записей администратору'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('client_name') or '').strip()
        phone = (body.get('phone') or '').strip()
        doctor = (body.get('doctor') or '').strip()
        service = (body.get('service') or '').strip()
        appt_time = (body.get('appointment_time') or '').strip()
        comment = (body.get('comment') or '').strip()

        if not name or not phone or not doctor or not appt_time:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Заполните имя, телефон, врача и время'}, ensure_ascii=False),
            }

        name_e = name.replace("'", "''")
        phone_e = phone.replace("'", "''")
        doctor_e = doctor.replace("'", "''")
        service_e = service.replace("'", "''")
        time_e = appt_time.replace("'", "''")
        comment_e = comment.replace("'", "''")

        cur.execute(
            "INSERT INTO appointments (client_name, phone, doctor, service, appointment_time, comment) "
            f"VALUES ('{name_e}', '{phone_e}', '{doctor_e}', '{service_e}', '{time_e}', '{comment_e}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'id': new_id}, ensure_ascii=False),
        }

    cur.execute(
        "SELECT id, client_name, phone, doctor, service, appointment_time, comment, status, "
        "to_char(created_at, 'DD.MM.YYYY HH24:MI') FROM appointments ORDER BY created_at DESC LIMIT 100"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    items = [
        {
            'id': r[0], 'client_name': r[1], 'phone': r[2], 'doctor': r[3],
            'service': r[4], 'appointment_time': r[5], 'comment': r[6],
            'status': r[7], 'created_at': r[8],
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'appointments': items}, ensure_ascii=False),
    }
