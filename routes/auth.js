// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'El correo ya está registrado' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashed });
    await newUser.save();

    // Generar token después del registro
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Usuario registrado correctamente', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});