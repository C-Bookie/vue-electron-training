port = 4242

from sanic import Sanic
import socketio

sio = socketio.AsyncServer()

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    sio.enter_room(sid, sid)

@sio.event
async def message(sid, data):
    print('message ', data)
    data += "!"
    await sio.send(data, sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)


if __name__ == '__main__':
    app = Sanic(name="Python server")
    sio.attach(app)
    app.run(host='0.0.0.0', port=port)
