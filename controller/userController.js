const employedata = require("./../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const moment = require("moment");
const secretkey = process.env.SECRECT_KEY;
const nodeMailer = require("nodemailer");

exports.employeSignup = async (req, res) => {

  // console.log(" This is user login requst body",req.body)
  // console.log(" this is user file upload body data",req.files)
  try {
    const { email, password, name, phonenumber } = req.body;
    const alreadyEmail = await employedata.findOne({ email });

    if (alreadyEmail) {
      return res.status(400).send("user already created");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = { name, email, phonenumber, password: hash };
    console.log(data);

    const otp = 774283;

    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "mehekjajpuraom700@gmail.com",
        pass: "ivma isbr grxu kysl",
      },
    });

    const newUser = new employedata(data);
    await newUser.save();

    const info = await transporter.sendMail({
      from: "mehekjajpuraom700@gmail.com",
      to: email,
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: ` Your otp is ${otp}`,
    });

    console.log(info," this is your email infomation ")
    return res
      .status(200)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getalluser = async (req, res) => {
  console.log(" token ke sath user details ----", req.userDetails);
  try {
    console.log(req.usertokennn, " userlogin auth");
    const allresult = await employedata.findOne({ req: req.userDetails.email });
    return res
      .status(200)
      .send({ message: " This is your all users", allresult });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};

exports.getsingleuser = async (req, res) => {
  try {
    const { id } = req.params;
    // const email = req.query.email
    const result = await employedata.findById(id);
    // console.log(result)
    return res.status(202).send({ message: " single user is finded ", result });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const dltuser = await employedata.findByIdAndDelete(id);
    console.log(dltuser);
    return res
      .status(202)
      .send({ message: " Your user delete sucessfully", dltuser });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedata = await employedata.findByIdAndUpdate(id, data, {
      new: true,
    });
    console.log(" Your user data updated sucessfully ", updatedata);
    return res
      .status(200)
      .json({ message: " Your user data updated sucessfully", updatedata });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "///");
    const alreadyEmail = await employedata.findOne({ email });
    console.log(alreadyEmail, "????");

    if (!alreadyEmail) {
      return res
        .status(400)
        .json({ message: "User is not created , please signup " });
    }
    const dbpassword = alreadyEmail._id;

    const match = bcrypt.compare(password, dbpassword);
    console.log(match, "mathch ");
    if (!match) {
      return res.status(400).send("incorrect password / password not match");
    }

    const token = JWT.sign({ email: alreadyEmail.email }, secretkey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: " User login sucessfully", token });
  } catch (error) {
    return res
      .status(404)
      .json({ message: " User not login try again", error });
  }
};

exports.resetUser = async (req, res) => {
  try {
    const { email, oldpassword, newPassword } = req.body;
    const alreadyEmail = await employedata.findOne({ email });

    if (!alreadyEmail) {
      return res.status(404).send({ message: " invaild user " });
    }

    const DBpassword = alreadyEmail.password;
    const id = alreadyEmail._id;

    const matchpassword = await bcrypt.compare(oldpassword, DBpassword);

    if (!matchpassword) {
      return res
        .status(404)
        .json({ message: " Password not match with old password!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      const data = { newPassword: hash };

      const passwordresult = await employedata.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res.status(202).send({
        message: "Your Password has been successfully updated! 🎉",
        result: passwordresult,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const alreadyEmail = await employedata.findOne({ email });

    if (!alreadyEmail) {
      return res.status(404).send({ message: " invaild user " });
    }

    const id = alreadyEmail._id;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newpassword, salt);

    const data = { newpassword: hash };
    const result = await employedata.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).json({ message: " Your password is not reset " });
  }
};

//   try {
//      const { email , newPassword } = req.body;

//   const alreadyEmail = await User.findOne({ email });
//   console.log(alreadyEmail);

//   if (!alreadyEmail) {
//     return res
//       .status(400).json({ message: "User is not created , please signup " });
//   }
//   else{
//     const id = alreadyEmail._id;
//  const salt = bcrypt.genSaltSync(10);
//  const hash = bcrypt.hashSync(newPassword, salt);
//   const data = { password:hash };
//   const result = await employedata.findByIdAndUpdate(id, data, { new: true });
//   return res.status(200).send(result);

//   }

//   } catch (error) {
//      return res.status(404).json({message:" Your password is not reset try again"})
//   }

exports.Dobcounter = async (req, res) => {
  const { dob } = req.body;
  const birth = moment(dob, "DD-MM-YYYY");
  const myage = moment();
  const ageyear = myage.diff(birth, "years");
  birth.add(ageyear, "year");
  const agemonth = myage.diff(birth, "month");
  birth.add(agemonth, "month");

  const ageday = myage.diff(birth, "day");
  birth.add(ageday, "day");
  const ageee = { age: { ageyear, agemonth, ageday } };
  return res.status(202).send(ageee);
};
