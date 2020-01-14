from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/')
def betting():
    return render_template('betting_page.html')

if __name__ == '__main__':
    app.run(
        debug=True,
        port=7999,
        host='0.0.0.0',
    )
