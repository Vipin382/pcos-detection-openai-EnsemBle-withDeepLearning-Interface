from typing import Union

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from keras.preprocessing import image
from keras.models import Model, load_model
import tensorflow as tf
from typing import Annotated
import numpy as np
from fastapi import FastAPI, File, UploadFile

dl_model = load_model("./dl_model.h5")
app = FastAPI()

origins = [
    "*"
]


def predictimage(path):
    img = tf.keras.utils.load_img(path, target_size=(224, 224))
    i = tf.keras.utils.img_to_array(img)/255
    input_arr = np.array([i])
    input_arr.shape

    pred = dl_model.predict(input_arr)
    if pred == 1:
        return False
    else:
        return True


class Item(BaseModel):
    path: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/dlPcos")
async def read_item(item:Item):
    data = predictimage(item.path)
    print(data)
    return {"result": data}
