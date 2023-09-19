// import bcrypt from "bcrypt"
import bcryptjs from "bcryptjs"
// two functions we will create : 1 hash karne k liye and 2 jo hased ho gaya password ko database se fetch kar ke compare karne ke liye ki sahi hai ya galat

// creating pass
export const hashPassword = async (password) => {
    try {
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt)
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}


// compare pass
export const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs.compare(password, hashedPassword)
}









