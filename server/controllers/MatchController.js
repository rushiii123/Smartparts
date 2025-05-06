// controllers/MatchController.js
export const matchProduct = async (req, res) => {
    try {
      const { labels } = req.body;
  
      const matchedProducts = await Product.find({
        labels: { $in: labels }
      });
  
      res.json({ matchedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Matching failed' });
    }
  };
  
