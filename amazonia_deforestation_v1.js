// Input Datasets
var amz = ee.FeatureCollection("users/celsohlsj/amazon_basin"); // Amazonia Delimitation
var amz_c = ee.FeatureCollection("users/celsohlsj/amazon_basin_countries"); // Amazonia Countries Delimitation

var mapbiomas = ee.Image('projects/mapbiomas-raisg/public/collection3/mapbiomas_raisg_panamazonia_collection3_integration_v2').clip(amz); // MapBiomas Amazonia Collection 3
var w_mask = ee.Image('JRC/GSW1_3/GlobalSurfaceWater').select("max_extent").clip(amz).remap([0,1],[1,0]); // JRC Global Surface Water Mapping Layers, v1.3

// Forest Area in 1985
var forest_1985 = mapbiomas.select('classification_1985').multiply(w_mask).eq(3);
var empty2 = ee.Image();
empty2 = empty2.addBands(forest_1985.rename("forest_1985"));

var farea = forest_1985.multiply(ee.Image.pixelArea()).multiply(0.000001);
var ftotal = farea.reduceRegions({
  collection: amz_c,
  reducer: ee.Reducer.sum(),
  scale: 30
});
 
Export.table.toDrive({
  collection: ftotal,
  folder:'DEF-AMZ_V1', 
  description: 'forest_area_1985',
  fileFormat: 'CSV'
  
});

// Deforestation Detection in Old-growth Forests (Only for Forest Formation/ID=3)
var empty = ee.Image();
for (var i=0; i<35; i++)  {
    // Here we reclassify the original MapBiomas Data to a anthropic mask (Farming - 14; Mosaic of Agriculture and Grass - 21; Non vegetated area (e.g. Urban and Mining - 22)
    // https://s3.amazonaws.com/amazonia.mapbiomas.org/leyenda/C%C3%B3digo_de_la_Leyenda_-_colecci%C3%B3n_3.pdf
    // The anthropic mask is generated from the year 1986; Here we detect the transition from a forest pixel in year_i (starting in 1985) to an anthropic pixel in year_i+1 (starting in 1986)
    var y = 1986+i;
    var year = 'classification_'+y;
    var oldvalues = ee.List([14,21,22,24,30,25]);
    var newvalues = ee.List([2,2,2,2,2,2]);
    var anthropic = mapbiomas.select(year).remap(oldvalues,newvalues).unmask(0);
    
    // Here we combine forest map (year_i) with athropic mask map (year_i+1) to mapping deforestation
    var year_forest_loss = forest_1985.add(anthropic).remap([0,1,2,3],[0,0,0,1]).rename(ee.String(year));
    empty = empty.addBands(year_forest_loss);
    
    // Update the baseline forest cover from 1985
    var inverse_deforestation = year_forest_loss.remap([0,1],[1,0]);
    forest_1985 = forest_1985.multiply(inverse_deforestation);
    empty2 = empty2.addBands(forest_1985.rename("forest_"+y));

}
var mapbiomas_forest_loss = empty.select(empty.bandNames().slice(1));
var mapbiomas_forest_old = empty2.select(empty2.bandNames().slice(1));
print(mapbiomas_forest_loss, "MapBiomas Forest Loss (1986-2020)");
Map.addLayer(forest_1985, {min: 0, max: 1, palette: ['ebebeb', '0ea30b']}, "Old-growth Forest in 1985");

Export.image.toDrive({
      image: mapbiomas_forest_old,
      description: 'amazonia_old_growth_forest_1985_2020', 
      scale: 30, 
      region: amz,
      folder: 'DEF-AMZ_V1',
      maxPixels:1e13
});

// Final Deforestation Map
var empty = ee.Image();
for (var i=1986; i<2021; i++)  {
    
  var year = mapbiomas_forest_loss.select("classification_"+i);
  var year = year.multiply(i).rename(ee.String("year_"+i));
  empty = empty.addBands(year);

}

var loss_year = empty.select(empty.bandNames().slice(1));
var image = loss_year;
var bandNames = image.bandNames();
var toCollection = ee.ImageCollection.fromImages(bandNames.map(function(name){
  name = ee.String(name);
  // select one band an put into an image. You might need a specific cast and renaming of the bands
  return image.select(name).rename('newName').toFloat();
}));
var summedBand = toCollection.sum().toInt16();
print(summedBand);

print(toCollection);
print(summedBand);

var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.YlOrRd[9];
Map.addLayer(summedBand.updateMask(summedBand.neq(0)), {min: 1986, max: 2020, palette: palette}, "Forest Loss 1986-2020");
Map.addLayer(w_mask.updateMask(w_mask.neq(1)), {min: 0, max: 1, palette: ['0000ff', 'ffffff']}, "Water Cover");

Export.image.toDrive({
      image: summedBand,
      description: 'amazonia_deforestation_1986_2020_collection2_v1', 
      scale: 30, 
      region: amz,
      folder: 'DEF-AMZ_V1',
      maxPixels:1e13
});

for (var i=1986; i<2021; i++) {
  var year = summedBand.eq(i);
  var year_area = year.multiply(ee.Image.pixelArea()).multiply(0.000001); // Area in km2
  
  var total = year_area.reduceRegions({
  collection: amz_c,
  reducer: ee.Reducer.sum(),
  scale: 30
  });

  Export.table.toDrive({
  collection: total,
  folder:'DEF-AMZ_V1', 
  description: 'deforestation_area_'+i,
  fileFormat: 'CSV'
  });
}