# WhoSpoke.AI - ML Component

This project uses state-of-the-art AI models to deliver the best user experience. The model pipeline is as follows:

* Noise reduction/suppression + voice amplification where necessary (e.g. using SpeechBrain)
* PyAnnote Voice Activity Detection (if not integrated into the diarization model already)
* PyAnnote Diarize
* Whisper
* WeSpeaker

Python 3.9 is the latest possible version for this pipeline (due to WeSpeaker, else it's Python 3.11).

We will also be using `uv` virtual environments as opposed to Anaconda due to its speed.