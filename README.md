[![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.6808579.svg)](http://dx.doi.org/10.5281/zenodo.6808579)
![licence](https://img.shields.io/badge/Licence-GPL--3-blue.svg)
![Github](https://img.shields.io/badge/Github-1.0.0-green.svg)

# Benchmark maps of deforestation for Amazonia

## Background:

We also created a class referred to as “deforestation in the year” to represent all areas classified as farming, urban infrastructure, or mining each year that in the previous year were classified as old-growth forests. That is, forest areas that were cleared and converted to another anthropic use. This rationale was used to compute the deforestation time series from 2003 to 2020 (deforestation data available at: https://github.com/celsohlsj/gee_brazil_sv). This procedure supported the generation of consistent information for all Amazon regions, though it is subject to inaccuracies derived from misclassifications in MapBiomas' product. As a result, some of the pixels in our deforestation data can be representing forest loss from other processes such as selective-logging, forest fires and blow-downs, which could be classified into farming though they are usually followed by forest regeneration. Nonetheless, a series of post-classification temporal and spatial filters are used in MapBiomas’ product to reduce incorrect class transitions (MapBiomas, 2021). In the Appendix Table S1.1 of Supporting Information, we compared annual deforestation estimates from our MapBiomas’ approach with estimates from official governmental approaches to deforestation monitoring for some Amazonian countries. Colombian and Brazilian official yearly estimates were respectively about 14% and 45% smaller on average, while Peruvian official yearly estimates were about 46% greater on average. Dissimilarities are expected in light of the different methodologies applied in each official governmental approach. 


The restoration and reforestation of 12 million hectares of forests by 2030 are amongst the leading mitigation strategies for reducing carbon emissions within the Brazilian Nationally Determined Contribution targets assumed under the Paris Agreement. Understanding the dynamics of forest cover, which steeply decreased between 1985 and 2018 throughout Brazil, is essential for estimating the global carbon balance and quantifying the provision of ecosystem services. To know the long-term increment, extent, and age of secondary forests is crucial; however, these variables are yet poorly quantified. Here we developed a 30-m spatial resolution dataset of the annual increment, extent, and age of secondary forests for Brazil over the 1986–2018 period. Land-use and land-cover maps from MapBiomas Project were used as input data for our algorithm, implemented in the Google Earth Engine platform. This dataset provides critical spatially explicit information for supporting carbon emissions reduction, biodiversity, and restoration policies, enabling environmental science applications, territorial planning, and subsidizing environmental law enforcement.

## Associated Publications:
#### The map was used in the following manuscript:
Silva Junior, C.H.L., Heinrich, V.H.A., Freire, A.T.G., Broggio, I.S., Rosan, T.M., Doblas, J., Anderson, L.O., Rousseau, G.X., Shimabukuro, Y.E., Silva, C.A., House, J.I., Aragão, L.E.O.C. Amazon fires in the 21st century: the year of 2020 in evidence . Scientific Data (2022). https://doi.org/

## Dataset access
#### Tiles structure of the dataset:
<img src="https://drive.google.com/uc?export=view&id=1l_M7XnboV8dcwBfOxnianpdt9sV6Mcpv" width="600">

#### The final data layers (v2) can be accessed from the Zenodo repository: https://doi.org/10.5281/zenodo.3928660

#### The final data layers (v2) can also be accessed through the Toolkit Download by administrative boundaries (states and municipalities), watersheds, biomes, and protected areas: https://code.earthengine.google.com/13bfcedb77ac7bac9ea1fb962b587a54?hideCode=true

#### Access to data asset in Google Earth Engine:
###### Data asset Brazil v2 (MapBiomas Collection 4.1) [1986-2018]
ID: users/celsohlsj/public/secondary_forest_age_collection41_v2<br />
ID: users/celsohlsj/public/secondary_forest_extent_collection41_v2<br />
ID: users/celsohlsj/public/secondary_forest_increment_collection41_v2<br />
ID: users/celsohlsj/public/secondary_forest_loss_collection41_v2
###### Data asset Amazonia v1 (MapBiomas Collection 2.0) [1986-2018]
ID: users/celsohlsj/public/secondary_forest_age_amazonia_collection2_v1<br />
ID: users/celsohlsj/public/secondary_forest_extent_amazonia_collection2_v1<br />
ID: users/celsohlsj/public/secondary_forest_increment_amazonia_collection2_v1<br />
ID: users/celsohlsj/public/secondary_forest_loss_amazonia_collection2_v1
###### Data asset Brazil v3 (MapBiomas Collection 5.0) [1986-2019]
ID: users/celsohlsj/public/secondary_forest_age_collection5_v3<br />
ID: users/celsohlsj/public/secondary_forest_extent_collection5_v3<br />
ID: users/celsohlsj/public/secondary_forest_increment_collection5_v3<br />
ID: users/celsohlsj/public/secondary_forest_loss_collection5_v3
###### Data asset Brazil v4 (MapBiomas Collection 6.0) [1986-2020]
ID: users/celsohlsj/public/secondary_forest_age_collection6_v4<br />
ID: users/celsohlsj/public/secondary_forest_extent_collection6_v4<br />
ID: users/celsohlsj/public/secondary_forest_increment_collection6_v4<br />
ID: users/celsohlsj/public/secondary_forest_loss_collection6_v4
###### Data asset Amazonia v2 (MapBiomas Collection 3.0) [1986-2020]
ID: users/celsohlsj/public/secondary_forest_age_amazonia_collection3_v2<br />
ID: users/celsohlsj/public/secondary_forest_extent_amazonia_collection3_v2<br />
ID: users/celsohlsj/public/secondary_forest_increment_amazonia_collection3_v2<br />
ID: users/celsohlsj/public/secondary_forest_loss_amazonia_collection3_v2
