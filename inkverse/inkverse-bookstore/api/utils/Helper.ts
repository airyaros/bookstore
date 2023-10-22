import bcrypt from "bcrypt";

export const encrypt = (data: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
};

export const formatNum = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
