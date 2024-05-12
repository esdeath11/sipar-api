// const values = [1.3, 1.6, 2.1, 2, 2.3, 2.3, 1.01]

// const variable = 2.2;

// // Find the nearest value in the list to the variable
// let nearest = values[0];
// let minDiff = Math.abs(nearest - variable);
// values.forEach(value => {
//     const diff = Math.abs(value - variable);
//     if (diff < minDiff) {
//         minDiff = diff;
//         nearest = value;
//     }
// });

// console.log('Nearest value:', nearest);

// List of cities in Europe
// const europeCities = [
//     "Paris",
//     "London",
//     "Berlin",
//     "Madrid",
//     "Rome",
//     // Add more cities as needed
//   ];
  
//   // List of cities in Asia
//   const asiaCities = [
//     "Tokyo",
//     "Beijing",
//     "Seoul",
//     "Bangkok",
//     "Mumbai",
//     // Add more cities as needed
//   ];
  
//   // Function to count the number of cities in a given list that are included in the citiesToVisit array
//   function countVisitedCities(cityList, citiesToVisit) {
//     let count = 0;
//     for (let city of citiesToVisit) {
//       if (cityList.includes(city)) {
//         count++;
//       }
//     }
//     return count;
//   }
  
//   // Cities you plan to visit
//   const citiesToVisit = ["Tokyo", "Beijing", "Mumbai", "Madrid"];
  
//   // Count the number of cities visited in each continent
//   const europeCount = countVisitedCities(europeCities, citiesToVisit);
//   const asiaCount = countVisitedCities(asiaCities, citiesToVisit);
  
//   // Compare counts to determine which continent you're visiting more
//   if (europeCount > asiaCount) {
//     console.log("You are visiting more cities in Europe.");
//   } else if (asiaCount > europeCount) {
//     console.log("You are visiting more cities in Asia.");
//   } else {
//     console.log("You are visiting an equal number of cities in Europe and Asia.");
//   }
  


function weightedAverageSimilarity(scores, weights) {
  if (scores.length !== weights.length) {
      throw new Error("Length of scores and weights arrays must be the same");
  }

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < scores.length; i++) {
      numerator += scores[i] * weights[i];
      denominator += weights[i];
  }

  if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
  }

  return numerator / denominator;
}

// Example usage:
const scores = [0.8, 0.6, 0.7];
const weights = [2, 1, 3];
const similarity = weightedAverageSimilarity(scores, weights);
console.log("Weighted Average Similarity:", similarity);

