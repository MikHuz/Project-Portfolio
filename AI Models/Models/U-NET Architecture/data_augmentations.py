from torch.utils.data import DataLoader, Dataset
from torchvision import transforms
from monai.transforms import (
    Compose, LoadImaged, EnsureChannelFirstd, ScaleIntensityd, 
    Rand2DElasticd, ToTensord,EnsureTyped,RandAffined, RandGaussianNoised,RandBiasFieldd, RandGridDistortiond
)
from monai.data import Dataset

class SegmentationDataset(Dataset):
    def __init__(self, image_paths, mask_paths, transform=None):
        self.image_paths = image_paths
        self.mask_paths = mask_paths
        self.transform = transform

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        img = Image.open(self.image_paths[idx]).convert('RGB')
        mask = Image.open(self.mask_paths[idx]).convert('L')

        img = np.array(img)
        mask = np.array(mask)
        
        img = torch.tensor(img, dtype=torch.float32).permute(2, 0, 1) 
        mask = torch.tensor(mask, dtype=torch.long).unsqueeze(0) 

        data = {"image": img, "semantic": mask}
        if not isinstance(data["image"], torch.Tensor):
            print(f"Warning: Image is not a tensor. Type: {type(data['image'])}")
        
        if not isinstance(data["semantic"], torch.Tensor):
            print(f"Warning: Mask is not a tensor. Type: {type(data['semantic'])}")

        if self.transform:
            data = self.transform(data)  

        return data["image"], data["semantic"]


transform = Compose([
    RandAffined(keys=["image", "semantic"], rotate_range=(0.1, 0.1), translate_range=(10, 10), scale_range=(0.1, 0.1), prob=0.5, mode=("bilinear", "nearest")),
    Rand2DElasticd(
        keys=["image", "semantic"], 
        spacing=(10, 10), 
        magnitude_range=(0.5, 0.7),  
        prob=0.5, 
        mode=("bilinear", "nearest")
    ),
    RandGridDistortiond(keys=["image", "semantic"], num_cells=5, distort_limit=0.1, prob=0.5, mode=("bilinear", "nearest")),
    RandGaussianNoised(keys=["image"], prob=0.5, mean=0.0, std=0.1),
    RandBiasFieldd(
    keys=["image"],
    coeff_range=(0.0, 0.1), 
    prob=0.5                 
    ),
    ScaleIntensityd(keys=["image", "semantic"]),  
    EnsureTyped(keys=["image", "semantic"]),  
])
# Transforms for validation and test sets remain original
dev_transform = Compose([
    ScaleIntensityd(keys=["image", "semantic"]), 
    EnsureTyped(keys=["image", "semantic"]),
    ToTensord(keys=["image", "semantic"]),
  
])
test_transform = Compose([
    ScaleIntensityd(keys=["image", "semantic"]), 
    EnsureTyped(keys=["image", "semantic"]),
    ToTensord(keys=["image", "semantic"]),
  
])
