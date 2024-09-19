// Auxiliary Dataset
var brazil = ee.FeatureCollection("users/celsohlsj/brazil");

//MapBiomas Brazil Collection 9
var mapbiomas = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection9/mapbiomas_collection90_integration_v1'); 

// Forest Cover in 1985
var forest_1985 = mapbiomas.select('classification_1985').remap([3,4,5,6,49,11,12,32,50], [1,1,1,1,1,1,1,1,1], 0);

var empty = ee.Image().byte();
for (var i=0; i<38; i++)  { // 1986 to 2023
    // https://brasil.mapbiomas.org/wp-content/uploads/sites/4/2024/08/Legenda-Colecao-9-LEGEND-CODE.pdf
    // The anthropic mask is generated from the year 1986
    var y = 1986+i;
    var year = 'classification_'+y;
    var oldvalues = ee.List([9,15,19,20,21,35,39,40,41,46,47,48,62]);
    var newvalues = ee.List([2,2,2,2,2,2,2,2,2,2,2,2,2]);
    var anthropic = mapbiomas.select(year).remap(oldvalues, newvalues, 0);
    
	// Here we combine forest map (year_i) with athropic mask map (year_i+1) to mapping deforestation
    var year_forest_loss = forest_1985.add(anthropic).remap([0,1,2,3],[0,0,0,1]).rename(ee.String(year));
    empty = empty.addBands(year_forest_loss);
    
  // Update the baseline forest cover from 1985
    var inverse_deforestation = year_forest_loss.eq(0);
    forest_1985 = forest_1985.multiply(inverse_deforestation);
}
var mapbiomas_forest_loss = empty.select(empty.bandNames().slice(1));

// Bringing All Deforestation Bands Together Into One
var empty = ee.Image().byte();
for (var i=1986; i<2024; i++)  { // 1986 to 2023
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

Export.image.toAsset({
      image: forest_1985.blend(summedBand.updateMask(summedBand.neq(0))),
      description: 'public/brazil_deforestation_vegetation_1986_2023_collection9_v2',
      scale: 30, 
      region: brazil.geometry().bounds(),
      maxPixels:1e13
});
