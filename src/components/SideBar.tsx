import { Button } from './Button';
import '../styles/sidebar.scss';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBar{
  handleClickButton: (id: number)=> void
  selectedGenreId:number;
}

export function SideBar(content:SideBar) {
   // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
 
  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => content.handleClickButton(genre.id)}
              selected={content.selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
  )

}