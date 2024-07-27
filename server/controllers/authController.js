const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const SECRET = process.env.SECRET;

const createToken = (username, id) => {
    return jwt.sign(
      {
        username,
        id
      },
      SECRET,
      {
        expiresIn: "2 days",
      }
    );
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const { data: existingUser, error: existingUserError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (existingUserError && existingUserError.code !== 'PGRST116') throw existingUserError;

        if (existingUser) {
            console.log(existingUser)
            return res.status(400).send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password: hashedPassword }])
            .single();

        if (error) throw error;

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { data: user, error: fetchUserError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (fetchUserError) throw fetchUserError;

        if (!user) {
            return res.status(400).send('User does not exist');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid credentials');
        }

        const token = createToken(user.username, user.id);
        const exp = Date.now() + 1000 * 60 * 60 * 48; 

        const response = {
            username: user.username,
            userId: user.id,
            token,
            exp,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).send('Error logging in user');
    }
};

module.exports = {
    register,
    login
};
