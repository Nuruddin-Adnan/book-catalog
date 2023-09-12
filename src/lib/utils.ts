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
