## Encoder-Decoder

### Encoder-Decoder Architecture

The encoder-decoder architecture is a widely used approach for image segmentation tasks. It consists of two main components that work together to extract features from an image and reconstruct a segmentation mask:

1. **Encoder**:  
   - Responsible for capturing and encoding relevant features from the input image.  
   - Typically composed of convolutional layers followed by pooling operations that progressively reduce the spatial dimensions while increasing feature depth.  
   - Captures high-level semantic information such as shapes, textures, or structures present in the image.

2. **Decoder**:  
   - Responsible for generating the segmentation mask from the encoded features.  
   - Usually consists of upsampling or transposed convolutional layers that gradually restore the original spatial dimensions.  
   - Often incorporates skip connections from the encoder to combine low-level spatial details with high-level semantic features, improving localization and segmentation accuracy.

This architecture allows the model to efficiently capture both high-level contextual information and low-level spatial details, enabling precise and context-aware segmentation, even in complex images.  

**Note:** In modern variants like the Attention U-Net, attention mechanisms can be added to the skip connections, allowing the model to focus on the most relevant features while suppressing irrelevant or noisy information. This further enhances segmentation performance.
