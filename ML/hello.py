#%%

import wespeaker

# %%
from pathlib import Path
import ffmpeg, imageio_ffmpeg

def convert_to_wav(src: str) -> str:
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




def test():
    # Assuming 'sample.m4a' exists in your ML directory
    try:
        path = convert_to_wav("sample.m4a")
        eval_audio(path)
    except FileNotFoundError as e:
        print(f"Error: The audio file was not found at {e.filename}")



def eval_audio(audio_path):
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


# %%
if __name__ == "__main__":
    test()


