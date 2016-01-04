# delayed-mirror

This is a simple project for creating a Delayed Mirror. Delayed mirrors are useful tools for practicing
dance, acrobatics, martial arts, or other technical movements. It's a nice way to get near-immediate feedback on
motions that are impossible or impractical to do in front of a mirror.

This project uses WebRTC and [MediaStreamRecorder](https://github.com/streamproc/MediaStreamRecorder) to
record the video stream from a devices camera, and play it back a few seconds later.

# Getting Started

You can just view it here: [www.delayed-mirror.com](https://www.delayed-mirror.com).

Or to build it yourself, make sure you have NPM and run:

    git clone https://github.com/wheeyls/delayed-mirror.git
    cd delayed-mirror
    npm run build
    open index.html

# Security Constraints

WebRTC in a browser requires SSL to run. When in development I use [ngrok](https://ngrok.com/) as a dead-simple
way to meet the SSL requirements.
