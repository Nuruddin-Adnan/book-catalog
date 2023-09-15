import { IUser } from "../types/book";

export type IReview = {
  reviewedBy: string | IUser;
  message: string;
  ratings: number;
  reviewdate: Date;
};

export function calculateRatings(items: IReview[]) {
  let total = 0;

  if (!(items.length > 0)) {
    return total;
  }

  for (const item of items) {
    const ratings =
      typeof item.ratings === "string"
        ? parseInt(item.ratings, 10)
        : item.ratings;
    if (ratings !== 0) {
      total += ratings;
    }
  }

  const rating = (total / items.length).toFixed(1);
  return rating;
}

export function padNumberToFourDigits(inputNumber: number) {
  // Convert the inputNumber to a string
  let numberString = String(inputNumber);

  // Check if the numberString has less than 4 characters
  if (numberString.length < 4) {
    // Calculate the number of leading zeros needed
    const leadingZeros = "0".repeat(4 - numberString.length);

    // Concatenate the leading zeros with the numberString
    numberString = leadingZeros + numberString;
  }

  return numberString;
}
