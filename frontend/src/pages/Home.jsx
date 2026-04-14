import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';

export default function Home() {
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(GlobalContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/food')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <header className="container" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.875rem' }}>
            The Digital Maître d'
          </p>
          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.05', marginBottom: '2rem' }}>Dining, <br />Redefined.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--on-surface)', opacity: 0.8, maxWidth: '500px', marginBottom: '3rem' }}>
            Experience an editorial approach to culinary curation. No clutter, just exceptional flavors waiting to be discovered.
          </p>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
            Discover the Menu <ArrowRight size={20} />
          </button>
        </div>
      </header>

      {/* Menu Catalog */}
      <main className="container" id="menu" style={{ paddingTop: '60px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Curated Selections</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {items.map((item, index) => (
            <div key={item._id} style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}>
              {/* Asymmetrical Layout Toggle */}
              {index % 2 !== 0 && (
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                   <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                     {item.tags.map(tag => (
                       <span key={tag} style={{ fontSize: '0.6875rem', letterSpacing: '0.05rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>{tag}</span>
                     ))}
                   </div>
                   <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.name}</h3>
                   <p style={{ fontSize: '1rem', color: 'var(--on-surface)', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>{item.description}</p>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: 'auto' }}>
                     <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>${item.price}</span>
                     <button className="btn-secondary" onClick={() => addToCart(item)}>Add to Taste</button>
                   </div>
                 </div>
              )}
              
              <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', borderRadius: '8px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {index % 2 === 0 && (
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                   <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                     {item.tags.map(tag => (
                       <span key={tag} style={{ fontSize: '0.6875rem', letterSpacing: '0.05rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>{tag}</span>
                     ))}
                   </div>
                   <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.name}</h3>
                   <p style={{ fontSize: '1rem', color: 'var(--on-surface)', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>{item.description}</p>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: 'auto' }}>
                     <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>${item.price}</span>
                     <button className="btn-secondary" onClick={() => addToCart(item)}>Add to Taste</button>
                   </div>
                 </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
