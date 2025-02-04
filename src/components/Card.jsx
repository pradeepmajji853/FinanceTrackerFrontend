import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({ image, title, content, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card
        sx={{
          maxWidth: 250,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#f0f8ff',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.05)',
            border: '2px solid #007bff'
          }
        }}
      >
        <CardMedia
          sx={{ height: 75 }}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
