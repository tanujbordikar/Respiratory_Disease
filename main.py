from flask import Flask, request, jsonify
import numpy as np
import librosa
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
classes = ["COPD", "Bronchiolitis", "Pneumonia", "URTI", "Healthy"]

# Define the allowed extensions
ALLOWED_EXTENSIONS = {'wav'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def stretch(data, rate):
    data = librosa.effects.time_stretch(data, rate)
    return data

# Load the pre-trained model
model = tf.keras.models.load_model('respiratory.h5')

def preprocess_audio(audio_data):
    try:
        data_x, sampling_rate = librosa.load(audio_data)
        features = np.mean(librosa.feature.mfcc(y=data_x, sr=sampling_rate, n_mfcc=52).T, axis=0)
        features = features.reshape(1, 52)

        return features
    except Exception as e:
        return None, str(e)

@app.route('/', methods=['GET'])
def home():
    return "Hello Tanuj!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        if file and allowed_file(file.filename):
            processed_audio = preprocess_audio(file)

            # Make predictions using the model
            test_pred = model.predict(np.expand_dims(processed_audio, axis=1))
            classpreds = classes[np.argmax(test_pred[0])]
            confidence = np.max(test_pred[0])
            confidence = float(confidence) * 100
            confidence = "{:.2f}".format(confidence) if confidence % 1 != 0 else "{:.0f}".format(confidence)
            
            return jsonify({'classpreds': classpreds, 'confidence': confidence})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
