#Michael Huziy
import matplotlib.pyplot as plt
import numpy as np
import math
from animations import Matrix
#Create animations using animations.py, which will be displayed in order within a plot

if __name__ == "__main__":

    OGdude = np.matrix('0 0 20 20 0 10 20 17 3 0 0 5 5 6 6 5 0 20 15 15 14 14 15;0 20 20 0 0 -30 0 5 5 0 20 15 14 14 15 15 20 20 15 14 14 15 15')#Create an object
    #dude = Matrix(dude)
    plt.ion()
    dude = Matrix(OGdude)#Copy object to a matrix which will be used for matrix multiplication
    plt.pause(1.0)
    dude = Matrix(OGdude)
    dude.plot(clrfig=1,xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude.translate(-40,20)
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude.reflect(axis="x")
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    
    dude.rotate(-math.pi/3.0, about='point')
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude.scale(1.5,1.5)
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude.rotate(-math.pi/3.0, about='origin')
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude.shear(-0.5,-0.5)
    dude.plot(clrfig = 0, xMin=-80,xMax=80,yMin=-80,yMax=80)
    plt.pause(2.0)
    
    dude = Matrix(OGdude)
    k =0
    for i in range(45):
        if i<10:
            dude.rotate(math.pi/20.0, about='point')
            dude.translate(.5, 0.5)
        elif (i < 20):
            if k == 0:  
                dude.scale(1.05,1.05);k =1
            else:
                dude.scale(0.95,0.95);k = 0
            dude.translate(0,-1)
        elif (i<25):
            dude.shear(0.9,0.9) 
        elif(i<30):
            dude.rotate(-math.pi / 3,about='point')
        elif(i<35):
            dude.reflect()  
        elif(i<40):
            dude.reflect(m=2,axis="y=mx") 
        else:
            dude.rotate(-math.pi / 2, about='origin')         
        dude.plot(clrfig=1)   
        plt.pause(1/100)
    
    totallySphericalBall =np.matrix('-20 -20 -15 -15 -20; 30  35   35 30 30')#New object
    ball = Matrix(totallySphericalBall)
    plt.ion()
    ball.plot()
    plt.pause(2.0)

    ball.translate(30,-40)
    ball.plot(clrfig=0)
    plt.pause(2.0)
    
    ball.scale(2,2)
    ball.plot(clrfig=0)
    plt.pause(2.0)
    
    ball.reflect(m = 2,axis="y=mx")
    ball.plot(clrfig=0)
    plt.pause(2.0)
    
    ball.rotate(-math.pi/4.0, about='point')
    ball.plot(clrfig=0)
    plt.pause(2.0)
    
    ball.rotate(-math.pi/3.0, about='origin')
    ball.plot(clrfig=0)
    plt.pause(2.0)
    
    ball.shear(0.5,0.5)
    ball.plot(clrfig=0)
    plt.pause(2.0)
    print("Michael Huziy")
    


