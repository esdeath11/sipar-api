// Example arrays s and w
let s = [1, 2, 3]; // Sample array s
let w = [4, 5, 6]; // Sample array w

// Function to calculate the value of a/b
function calculateRatio(s, w) {
    // Check if the lengths of s and w are equal
    if (s.length !== w.length) {
        throw new Error("Arrays s and w must have the same length");
    }

    let a = 0;
    let b = 0;

    for (let i = 0; i < s.length; i++) {
        a += s[i] * w[i];
        b += w[i];
    }

    if (b === 0) {
        throw new Error("Sum of weights (b) cannot be zero");
    }

    return a / b;
}

// Calculate the ratio a/b
let ratio = calculateRatio(s, w);
console.log(ratio); // Output the result
