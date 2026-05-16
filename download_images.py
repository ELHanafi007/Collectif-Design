import urllib.request
import urllib.parse
import os

prompts = [
    ("salon.jpeg", "Ultra-luxury modern Moroccan living room with a large white modular sofa, bright airy atmosphere, architectural photography, 8k, photorealistic"),
    ("table_a_manger.jpeg", "Premium minimalist wooden dining table, isolated on a light gray background, studio lighting, photorealistic, 8k"),
    ("tablesdechevet.jpeg", "High-end minimal wooden nightstand, isolated on a light gray background, studio lighting, photorealistic, 8k")
]

os.makedirs('public', exist_ok=True)

for filename, prompt in prompts:
    # URL encode the prompt
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1200&height=1200&nologo=true"
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, f"public/{filename}")
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

