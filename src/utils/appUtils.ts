export const extractFeatures = (featuresString) => {
  if (typeof featuresString !== "string") return []
  return featuresString.split(",").reduce((features, feature) => {
    if (feature.length) features.push(feature.trim())
    return features
  }, [])
}
