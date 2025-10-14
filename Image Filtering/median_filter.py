'''
This program performs median filtering on a set of images to reduce noise and transient artifacts. 

Key functionalities:
1. `loadImages(location, type)`: Loads images from the specified folder and stores them in `img_list`.
2. `myMedian(List)`: Computes the median of a given list.
3. `filter_3_imgs`: Applies median filtering to three images, generating a new image where each pixel's RGB values are the median of the corresponding pixels in the three input images.
4. `filter_odd_imgs`: A generalized version of `filter_3_imgs` that works with any ODD number of images, computing the median pixel values across all loaded images.

Usage:
- Call `loadImages("path/to/images", "png")` to load images.
- Run `filter_3_imgs` to process three images or `filter_odd_imgs` for any ODD number of images.
- The output images are displayed and saved as pngs.

This technique is useful for noise reduction in image processing, particularly when working with multiple images of the same scene.'''

from PIL import Image
from pprint import pprint
import numpy
import math
import time
from glob import glob

img_list = []
def loadImages(location, type):
    if len(img_list) != 0:
        img_list.clear()
    for image in glob(f'{location}/*.{type}'):
        img_list.append(Image.open(image))

def myMedian(List):
    if (len(List) % 2) == 0:
        print(f"Even number of ints in list")
        return
    middleLocation = (len(List) + 1) // 2
    #print(f"Middle loc:{middleLocation}")
    List.sort()
    return List[middleLocation-1]

def filter_3_imgs ():#works with three images
    img1 = img_list[0].getdata()
    img2 = img_list[1].getdata()
    img3 = img_list[2].getdata()
    newImg = img_list[0].copy()
    newList = []
    for i in range(len(img1)):
        redList = [img1[i][0], img2[i][0],img3[i][0]]
        greenList =[img1[i][1], img2[i][1],img3[i][1]]
        blueList =[img1[i][2], img2[i][2],img3[i][2]]
        medianRed = myMedian(redList)
        medianGreen = myMedian(greenList)
        medianBlue = myMedian(blueList)
        newList.append((medianRed,medianGreen,medianBlue))
        #print(f"{i}: {medianRed}, {medianGreen}, {medianBlue}")
    newImg.putdata(newList)
    newImg.show()
    newImg.save("filter_3.png")

def filter_odd_imgs():#use any odd number of images
    images = []
    newImg = img_list[0].copy()
    newList = []
    for i in range(len(img_list)):
        images.append(img_list[i].getdata())
    pixels = len(images[0])
    numImgs = len(images)
    for p in range(pixels):
        #print(f"Pixel one:")
        redList = []
        greenList = []
        blueList = []
        for i in range(numImgs):
            #print(f"Image {i}: {images[i][p]}")
            #print(f"Appending red Channel:{images[i][p][0]}\n")
            #print(f"Appending green Channel:{images[i][p][1]}\n")
            #print(f"Appending blue Channel:{images[i][p][2]}\n")
            redList.append(images[i][p][0])
            greenList.append(images[i][p][1])
            blueList.append(images[i][p][2])
           
        medianRed = myMedian(redList)
        medianGreen = myMedian(greenList)
        medianBlue= myMedian(blueList)
        #print(greenList)
        #print(f"Median Value:{medianGreen}")
        newList.append((medianRed,medianGreen,medianBlue))
    newImg.putdata(newList)
    newImg.show()
    newImg.save("filter_odd_imgs.png")
    return None
    
        
    
my_list = [1,2,3,4,5,6,7,8,9]
print(f"Median is {myMedian(my_list)}")
loadImages("images/filter_3_imgs","png")
filter_3_imgs()
loadImages("images/filter_odd_imgs","png")
#print(f"num of images: {len(img_list)}")
#print(f"num of pixels: {len(img_list[2].getdata())}")
filter_odd_imgs()

