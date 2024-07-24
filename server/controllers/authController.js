const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const SECRET = process.env.SECRET

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
        .from('Users')
        .insert([{ username, email, password: hashedPassword }]);
        if (error) throw error;
        resizeBy.status(201).send('User registered successfully')
    } catch (error) {
        console.error('Error registering: ', error);
        res.status(500).send('Error registering user');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { data, error } = await supabase
       .from('Users')
       .select('*')
       .eq('username', username);
       if (error || data.length === 0) {
        return res.status(401).send("Invalid Credentials")
       }

       const user = data[0];
       const isPasswordValid = await bcrypt.compare(password, user.password)

       if (!isPasswordValid) {
        return res.status(401).send("Invalid Credentials")
       }

       const token = jwt.sign({ token, userId: user.id, exp: Date.now() + 3600 * 1000, username: user.username })
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).send('Error logging in user');
    }
}

module.exports = { register, login }