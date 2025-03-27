#Michael Huziy
import matplotlib.pyplot as plt
import numpy as np
import math


class Matrix:

    """ ------------------------------------------------------
    :: Initialization stuff
    ------------------------------------------------------
    """
    def __init__(self, matrix):   
        self.matrix = matrix
        onesRow = np.ones(self.matrix.shape[1])
        print(self.matrix)
        self.matrix = np.vstack((self.matrix, onesRow))
        
    """
    ------------------------------------------------------
     :: Rotation Transformation
 	  Arguments: 
 	      theta: rotate object theta radians (default: 0)
          Possible Arguments: 
	      about:  Rotate about different axes...i.e. about origin , about a point (default: origin)
    ------------------------------------------------------
    """
    
    def rotate(self, radians,about='origin'):
        cos_t = math.cos(radians)
        sin_t = math.sin(radians)
        if about == 'origin':
            print('rotate about origin')
            self.matrix = np.matrix(' %s %s  0;'
                                    ' %s %s  0;'
                                    '  0  0  1' % (cos_t, -sin_t, sin_t, cos_t)) * self.matrix
        elif about == 'point':
            print('rotate about point')
            xpoint = self.matrix[0,0]
            ypoint = self.matrix[1,0]
            self.translate(-xpoint,-ypoint)
            self.matrix = np.matrix(' %s %s  0;'
                                    ' %s %s  0;'
                                    '  0  0  1' % (cos_t, -sin_t, sin_t, cos_t)) * self.matrix
            self.translate(xpoint,ypoint)

        elif about == 'center':
            xpoint = np.mean(self.matrix[0,:])
            ypoint = np.mean(self.matrix[1,:])
            self.translate(-xpoint,-ypoint)
            self.matrix = np.matrix(' %s %s  0;'
                                    ' %s %s  0;'
                                    '  0  0  1' % (cos_t, -sin_t, sin_t, cos_t)) * self.matrix
            self.translate(xpoint,ypoint)
            
    """
     ------------------------------------------------------
     :: Translate Transformation
        Arguments: 
           dx : Translate in x direction  (Default: 0)
    	   dy : Translate in y direction (Default: 0)

     ------------------------------------------------------
    """
     
    def translate(self, dx=0, dy=0):
        print('translate')
        self.matrix = np.matrix(' 1  0 %s;'
                                ' 0  1 %s;'
                                ' 0  0  1' % (dx, dy)) * self.matrix

    """
     ------------------------------------------------------
     :: Scale Transformation
         Arguments: 
           dx : Scale in x direction
    	   dy : Scale in y direction

     ------------------------------------------------------
    """
    
    def scale(self, dx=1, dy=1):
        print('scale') # this may be removed
        self.matrix = np.matrix('%s 0 0;'
                                 ' 0 %s 0; '
                                 ' 0 0  1' % (dx, dy)) * self.matrix


    """
      ------------------------------------------------------
     # :: Reflect Transformation
     #    Possible Arguments: 
     #       axis : axis to reflect object about
     #
     # ------------------------------------------------------
    """
    
    def reflect(self,m=0,axis='x'):
        if axis == 'x':
            print('reflect-x') # this may be removed
            # REFLECT ABOUT X-AXIS
            self.matrix = np.matrix(' 1  0  0;'
                                    ' 0 -1  0;'
                                    ' 0  0  1' ) * self.matrix
        elif axis == 'y':
            print('reflect-y') # this may be removed
            # REFLECT ABOUT Y-AXIS  
            self.matrix = np.matrix('-1  0  0;'
                                    ' 0  1  0;'
                                    ' 0  0  1' ) * self.matrix
        elif axis == 'y=x':
            print('reflect-y=x') # this may be removed
            # REFLECT ABOUT Y=X 
            self.matrix = np.matrix(' 0  1  0;'
                                    ' 1  0  0;'
                                    ' 0  0  1' ) * self.matrix
        elif axis == 'y=mx':
            print('reflect-y=mx') # this may be removed
            # REFLECT ABOUT Y=X 
            t = m**2
            a = (1.0-m**2) / (1.0+m**2)
            b =(2.0*m) / (1.0 + m**2)
            c = b
            d = (m**2 - 1.0 )/ (1.0 + m**2)
            self.matrix = np.matrix(' %s  %s  0;'
                                    ' %s  %s  0;'
                                    ' 0  0  1' % (a,b,c,d)) * self.matrix
           
    """
     # ------------------------------------------------------
     # :: Shearing Transformation
     #    Arguments: 
     #  dx : Shear in x direction  
     #	dy : Shear in y direction  
     #
     # ------------------------------------------------------
    """
    def shear(self,type="hv", dx=0, dy=0):
        #type is horizontal or vertical shear, default is both
        if type=="h":
             print('horizontal shear')
             self.matrix = np.matrix('-1  %s  0;'
                                    ' 0  1  0;'
                                    ' 0  0  1'  % (dx) ) * self.matrix
        elif type == "v":
             print('vertical shear')
             self.matrix = np.matrix('-1  0  0;'
                                    ' %s  1  0;'
                                    ' 0  0  1'  % (dy) ) * self.matrix
        else: 
            print('shear across both axis')
            self.matrix = np.matrix('-1  %s  0;'
                                    ' %s  1  0;'
                                    ' 0  0  1' % (dx, dy) ) * self.matrix

    """
     # :: Plot object. 
     #    Optional Arguments:  (You may modify these values)
     #       - 'clrfig' : Clear figure before plotting (default 1)
     #	- 'xMin'/'xMax' : Plot limits for x-values (default: -40,40) 
     # 	- 'yMin'/'yMax' : Plot limits for y-values (default: -40,40)
     #
    """
    def plot(self, clrfig=1,xMin=-40,xMax=40,yMin=-40,yMax=40):   
        if clrfig == 1:
            plt.gcf().clear()
        plt.plot(np.transpose(self.matrix[0, :]), np.transpose(self.matrix[1, :]))
        plt.xlim(xMin, xMax)       
        plt.ylim(yMin, yMax)
        plt.show()

       