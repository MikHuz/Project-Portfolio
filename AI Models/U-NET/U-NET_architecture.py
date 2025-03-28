import torch.optim as optim
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.nn.functional as F
PYDEVD_WARN_SLOW_RESOLVE_TIMEOUT=1.0

class UNET(nn.Module):
    def __init__(self, in_channels, out_channels,device):
        super(UNET, self).__init__()
       
        self.device = device
        self.pool = nn.MaxPool2d(2, 2)
        self.sigmoid = nn.Sigmoid()
        
        # Define encoder and decoder blocks with in/out channels
        self.enc1 = self.encode_block(in_channels, 64)
        self.enc2 = self.encode_block(64, 128)
        self.enc3 = self.encode_block(128, 256)
        self.enc4 = self.encode_block(256, 512)
        self.enc5 = self.encode_block(512, 1024)
        
        self.dec4 = self.decode_block(1024, 512)
        self.dec3 = self.decode_block(512, 256)
        self.dec2 = self.decode_block(256, 128)
        self.dec1 = self.decode_block(128, 64)
        
        self.final_conv = nn.Conv2d(64, out_channels, kernel_size=1)
        
    # Encoder
    def encode_block (self, in_channels, out_channels): 
        return nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3,stride=1,padding=1),#3x3 Conv
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),#Non-linearity function
            nn.Conv2d(out_channels, out_channels, kernel_size=3,stride=1,padding=1),  
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )
        
    def up_conv(self, in_channels, out_channels):# Upsampling: Doubles spatial dimensions of feature maps, however ConvTranspose also halves the number of feature maps with 2x2 Conv here after.
        return nn.ConvTranspose2d(in_channels, out_channels, kernel_size=2, stride=2).to(self.device)
    
    
    # Decoder
    def decode_block(self, in_channels, out_channels):
        return nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=1,padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3,stride=1, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )
        
    def forward(self, x):
        x = self.enc1(x)
        enc1_pooled = self.pool(x)
        #print(f"enc1 shape: {x.shape}")
        
        enc2 = self.enc2(enc1_pooled)
        enc2_pooled = self.pool(enc2)
     
        enc3 = self.enc3(enc2_pooled)
        enc3_pooled = self.pool(enc3)
        
        enc4 = self.enc4(enc3_pooled)
        '''enc4_pooled = self.pool(enc4)
        
        enc5 = self.enc5(enc4_pooled)
      
        # Decoder path with upsampling
        
        dec = self.up_conv(1024,512)(enc5) 
        dec = torch.cat((dec, enc4), dim=1)
        dec = self.dec4(dec)'''#May add additional convolutions if sufficint GPU resources are accessible.
        
        dec = self.up_conv(512, 256)(enc4) 
        dec = torch.cat((dec, enc3), dim=1)
        dec = self.dec3(dec)
        
        dec = self.up_conv(256, 128)(dec) 
        dec = torch.cat((dec, enc2), dim=1)
        dec = self.dec2(dec)
   
        dec = self.up_conv(128, 64)(dec)
        dec = torch.cat((dec, x), dim=1)
        dec = self.dec1(dec)
        
        dec = self.final_conv(dec)
        dec = self.sigmoid(dec)
        #print(f"Final output after 1x1 convolution: {dec}")
        return dec
        