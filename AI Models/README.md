# 🧠 Biomedical Image Segmentation Models

## Overview
Collaborative project with **Cedars-Sinai Medical Center** exploring AI for diagnostic imaging.


This project applies **deep learning for medical image segmentation** to assist in the early and accurate detection of brain tumors. Using convolutional neural networks (CNNs) built in **PyTorch**, these models analyze MRI brain scans and highlight regions that may represent abnormalities or tumors.  
The goal is to **enhance diagnostic accuracy**, enabling faster treatment decisions and reducing diagnostic errors through AI-assisted imaging.

## Features / Highlights
- **U-Net and Encoder–Decoder architectures** implemented for biomedical image segmentation.  
- Achieved up to **90.9% Dice Coefficient** and **83.3% IoU**, representing a **5.6% improvement** over the provided baseline benchmark.  
- Trained locally on my GPU using a **Conda virtual environment** and **WSL** integration with **VS Code**.  
- Visualization of training progress, loss metrics, and model predictions compared to ground-truth masks.  
- Demonstrates strong understanding of model training, tuning, and evaluation in a healthcare-relevant context.

## Technologies Used
- **Python**  
- **PyTorch** (Deep Learning Framework)  
- **Jupyter Notebooks**  
- **Conda / WSL / VS Code** (Development Environment)  
- **Kaggle Datasets** (MRI Brain Scans)  
- **Matplotlib / NumPy / Pandas** (Data Visualization & Preprocessing)

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/MikHuz/AI-Models.git
   cd AI-Models
   ```
2. **Create and activate the Conda environment**
   ```bash
   conda create -n ai-models python=3.9
   conda activate ai-models
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Open Jupyter Notebook**
   ```bash
   jupyter notebook
   ```
5. **Run the training notebook**
   - Select a model (U-Net or Encoder-Decoder).
   - Load MRI dataset paths in the configuration cell.
   - Execute all cells to begin training.

> ⚠️ **Note:** An NVIDIA CUDA-enabled GPU is recommended for efficient training.

## Demo
### Sample Prediction
| Image | Model Prediction | True Mask |
|--------|------------------|------------|
| ![Input Image](Image.png) | ![Prediction](prediction.png) | ![Mask](testmask.png) |

These examples illustrate how the U-Net model segments MRI scans, highlighting tumor boundaries compared to ground truth.

### Training Progress
| Development Loss | DICE & IoU Metrics |
|------------------|--------------------|
| ![Dev Loss](U-NET/DevLoss.png) | ![DICE/IOU](U-NET/DICE_IOU.png) |

- **Development Loss:** Monitors optimization progress — lower values indicate better convergence.  
- **Dice & IoU Metrics:** Quantify segmentation accuracy per epoch — higher values reflect more accurate masks.


