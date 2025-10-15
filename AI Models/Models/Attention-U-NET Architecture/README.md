# Attention U-Net Model

This project implements an Attention U-Net architecture. While I was able to integrate the attention gates, the hard limitations of my GPU prevented full training and thus hyperparameter tuning and experimentation for optimal results.  

## Attention U-Net Architecture

<p align="center">
  <img src="attention-image3.jfif" alt="Encoder-Decoder Architecture" style="width:80%; height:500px; object-fit:cover;">
</p>


The Attention U-Net model extends the original U-Net architecture by incorporating attention mechanisms to improve segmentation accuracy, especially in complex images with varying levels of detail. Key components and functionality include:

**Encoder:** Similar to the traditional U-Net, the encoder captures high-level semantic features from the input image using convolutional layers and max-pooling operations. This progressively reduces spatial dimensions while increasing the depth of the feature maps.  

**Bottleneck:** The bottleneck captures the most abstract features of the image and contains the encoded information. This section allows the model to retain important features for segmentation while minimizing spatial resolution.  

**Decoder:** The decoder restores the spatial resolution of the feature maps, gradually increasing the image size using upsampling or transposed convolutional layers. The goal is to reconstruct the segmentation mask from the encoded features.  

**Skip Connections with Attention Gates:** The main innovation of the Attention U-Net is the use of attention gates in the skip connections between the encoder and decoder. These gates help the model focus on the most relevant features by suppressing irrelevant regions in the feature maps. This enables the decoder to concentrate on high-priority areas of the image, improving segmentation accuracy, particularly when background or irrelevant details might otherwise confuse the model.  

**Attention Mechanism:** Attention gates apply a learned attention map that is multiplied with the encoder feature map before passing it to the decoder. This ensures that only important features are propagated, allowing the model to focus on regions of interest (e.g., tumors, organs, or other structures) while ignoring irrelevant background information.  

By combining attention mechanisms with the traditional U-Net structure, the Attention U-Net enhances image segmentation performance, allowing for more accurate and context-aware segmentations in challenging or cluttered images.  

## Limitations / Future Work

- Limited GPU resources prevented full training and hyperparameter tuning.  
- Future improvements could include training on larger datasets, optimizing attention gate parameters, and experimenting with different loss functions for better segmentation accuracy.
