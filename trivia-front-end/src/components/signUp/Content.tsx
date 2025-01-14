import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CelebrationIcon from '@mui/icons-material/Celebration';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const items = [
  {
    icon: <CelebrationIcon sx={{ color: 'text.secondary' }} />,
    
    title: 'Enjoy Endless Fun',
    description: 'Test your knowledge across a variety of entertaining and quirky topics. From pop culture to random facts, our trivia challenges are designed to keep the fun going while you learn something new!',
  },
  {
    icon: <ExploreIcon sx={{ color: 'text.secondary' }} />,
    title: 'Explore Fascinating Fun Facts',
    description: "Explore trivia questions that make you laugh, think, and share with others. It’s more than a game—it’s a journey of discovery!",
  },
  {
    icon: <EmojiEmotionsIcon sx={{ color: 'text.secondary' }} />,
    title: 'Fun for Everyone',
    description: "Whether you're a casual player or a trivia enthusiast, there's something for everyone. Dive into themed quizzes, unlock achievements, and enjoy hours of exciting gameplay",
  }
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        
      </Box>
    
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
