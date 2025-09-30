#%%

import wespeaker

# %%
from pathlib import Path
import ffmpeg, imageio_ffmpeg






def test(model, path):
    # Assuming 'sample.m4a' exists in your ML directory
    try:
        newpath = convert_to_wav(path)
        get_embeddding(newpath)
    except FileNotFoundError as e:
        print(f"Error: The audio file was not found at {e.filename}")



def get_embeddding(audio_path):
    model = wespeaker.load_model("english")
    # Using 'cpu' if CUDA is not available.
    # You can change this to 'cuda:0' if you have a compatible GPU.
    model.set_device('cpu')

    print(f"Extracting embedding from: {audio_path}")
    embedding = model.extract_embedding(audio_path)
    # utt_names, embeddings = model.extract_embedding_list('wav.scp')
    # similarity = model.compute_similarity('audio1.wav', 'audio2.wav')
    # diar_result = model.diarize('audio.wav', 'give_this_utt_a_name')
    print("Embedding extracted successfully!")
    print("Shape of the embedding:", embedding.shape)

    # # register and recognize
    # model.register('spk1', 'spk1_audio1.wav')
    # model.register('spk2', 'spk2_audio1.wav')
    # model.register('spk3', 'spk3_audio1.wav')
    # result = model.recognize('spk1_audio2.wav')

class WhoSpoke:
    def __init__(self):
        self.model = wespeaker.load_model("english")
        self.model.set_device("cpu")
    
    def convert_to_wav(self, src: str) -> str:
        p = Path(src)
        if not p.is_file(): raise FileNotFoundError(p)
        if p.suffix.lower() == ".wav": return str(p.resolve())
        out = Path.cwd() / "current.wav"
        ff = imageio_ffmpeg.get_ffmpeg_exe()
        (ffmpeg.input(str(p))
            .output(str(out), map_metadata=0, vn=None, sn=None)
            .overwrite_output()
            .run(cmd=ff, quiet=True))
        return str(out)
    
    def get_embedding(self, audio_path):
        embedding = self.model.extract_embedding(audio_path)
        print("Shape of the embedding:", embedding.shape)
        return embedding
    
    def diarize(self, audio_path):
        # The diarize method returns a tuple: (list_of_segments)
        newpath = self.convert_to_wav(audio_path)
        diarize_result = self.model.diarize(newpath, 'untitled')

        print("Diarization complete.")
        print(f"Found {len(diarize_result)} speakers.")
        print("\n--- Speaker Segments ---")
        
        for i in range(len(diarize_result)):
            print(
f"""== Segment {i} ==
- Speaker: {diarize_result[i][0]}
- Start Time: {diarize_result[i][1]}
- End Time: {diarize_result[i][2]}
- Overlapping Speakers (???): {diarize_result[i][3]}
            """)
            
    




# %%
if __name__ == "__main__":
    ml = WhoSpoke()
    ml.diarize("test.m4a")



# %%
