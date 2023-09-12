export type IUser = {
  _id: string;
  role: "general_user";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  email: string;
  imgURL: string;
  address: string;
};

export type IBook = {
  _id?: string;
  title: string;
  description: string;
  author: string | IUser;
  genre: string;
  publicationDate: Date | string;
  imgURL?: string;
  reviews?: [
    {
      reviewedBy: string;
      message: string;
      ratings: number;
      reviewdate: Date;
    }
  ];
  createdAt: Date;
  updatedAt?: Date;
};
