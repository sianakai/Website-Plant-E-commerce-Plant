import React, { useState } from 'react';
import { X, Sparkles, Wind, Sun, Check, Plus, ShoppingBag } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/plants';
import { PlantProduct } from '../../types';
import { formatPrice, Currency } from '../../utils/format';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMultipleToCart: (products: PlantProduct[]) => void;
  currency: Currency;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  onAddMultipleToCart,
  currency,
}) => {
  const [roomSize, setRoomSize] = useState<number>(18); // m2
  const [roomType, setRoomType] = useState<'Kamar Tidur' | 'Ruang Kerja' | 'Ruang Tamu'>('Ruang Kerja');
  const [lightLevel, setLightLevel] = useState<'Redup' | 'Sedang' | 'Terang'>('Sedang');
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([
    'prod-top-1',
    'prod-top-5',
    'prod-trendy-1',
  ]);

  if (!isOpen) return null;

  const togglePlant = (id: string) => {
    setSelectedPlantIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculate live O2 index
  const basePurity = 45;
  const o2Boost = Math.min(54, selectedPlantIds.length * 18 - Math.floor(roomSize / 5));
  const purityIndex = Math.min(99, Math.max(35, basePurity + o2Boost));

  const chosenPlants = ALL_PRODUCTS.filter(p => selectedPlantIds.includes(p.id));
  const bundlePrice = chosenPlants.reduce((sum, p) => sum + p.price, 0);

  const handleAddBundle = () => {
    onAddMultipleToCart(chosenPlants);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-[#18241E] border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl text-[#E8EFE9] z-10 my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7BC043]">
              <Sparkles size={16} />
              <span>Planto Live Demo Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Simulasi Oksigen &amp; Penataan Ruangan
            </h2>
            <p className="text-xs sm:text-sm text-[#9DB0A3] mt-1">
              Ukur kadar pemurnian udara ruangan Anda berdasarkan kombinasi tanaman Planto.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#9DB0A3] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Room Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#9DB0A3] uppercase tracking-wide">
                1. Tipe Ruangan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Kamar Tidur', 'Ruang Kerja', 'Ruang Tamu'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRoomType(type)}
                    className={`py-2 px-2 text-xs rounded-xl border text-center transition-colors ${
                      roomType === type
                        ? 'bg-[#7BC043] text-black font-bold border-[#7BC043]'
                        : 'bg-white/5 border-white/10 text-[#9DB0A3] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#9DB0A3] uppercase tracking-wide">2. Luas Ruangan</span>
                <span className="text-[#7BC043] font-bold">{roomSize} m²</span>
              </div>
              <input
                type="range"
                min="8"
                max="50"
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                className="w-full accent-[#7BC043] bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-[#9DB0A3]">
                <span>8 m² (Kecil)</span>
                <span>25 m² (Sedang)</span>
                <span>50 m² (Besar)</span>
              </div>
            </div>

            {/* Light Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#9DB0A3] uppercase tracking-wide">
                3. Intensitas Sinar Matahari
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Redup', 'Sedang', 'Terang'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLightLevel(l)}
                    className={`py-2 px-2 text-xs rounded-xl border text-center transition-colors flex items-center justify-center gap-1.5 ${
                      lightLevel === l
                        ? 'bg-[#7BC043] text-black font-bold border-[#7BC043]'
                        : 'bg-white/5 border-white/10 text-[#9DB0A3] hover:text-white'
                    }`}
                  >
                    <Sun size={13} />
                    <span>{l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plant Selector Checklist */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#9DB0A3] uppercase tracking-wide">
                4. Pilih Tanaman dalam Simulasi ({selectedPlantIds.length} dipilih)
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ALL_PRODUCTS.slice(0, 6).map((plant) => {
                  const isSelected = selectedPlantIds.includes(plant.id);
                  return (
                    <div
                      key={plant.id}
                      onClick={() => togglePlant(plant.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#7BC043]/15 border-[#7BC043] text-white'
                          : 'bg-white/5 border-white/10 text-[#9DB0A3] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={plant.imageUrl} alt={plant.name} className="w-8 h-8 object-contain" />
                        <div>
                          <span className="text-xs font-medium block">{plant.name}</span>
                          <span className="text-[10px] text-[#7BC043]">{formatPrice(plant.price, currency)}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-[#7BC043] border-[#7BC043] text-black' : 'border-white/20'
                      }`}>
                        {isSelected && <Check size={13} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Interactive Room Visualizer Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Visualizer Canvas Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#14201A] to-[#101915] border border-white/10 p-6 flex flex-col items-center justify-between min-h-[300px] overflow-hidden">
              
              {/* O2 Meter Gauge */}
              <div className="w-full flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#7BC043]/20 text-[#7BC043]">
                    <Wind size={20} />
                  </span>
                  <div>
                    <span className="text-[11px] text-[#9DB0A3] block uppercase tracking-wider">Tingkat Kemurnian O₂</span>
                    <span className="text-xl font-bold text-[#7BC043]">{purityIndex}% Optimal</span>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[#E8EFE9]">
                  {roomType} • {roomSize} m²
                </span>
              </div>

              {/* Plants In Room Stage */}
              <div className="relative w-full h-44 flex items-end justify-center gap-2 sm:gap-4 my-4 z-10">
                {chosenPlants.length === 0 ? (
                  <div className="text-center text-xs text-[#9DB0A3] self-center">
                    Belum ada tanaman yang diletakkan. Pilih tanaman di panel samping!
                  </div>
                ) : (
                  chosenPlants.map((plant, i) => (
                    <div
                      key={plant.id}
                      className="relative group transition-all duration-300 animate-in zoom-in-75"
                      style={{ transform: `scale(${0.85 + (i % 3) * 0.1})` }}
                    >
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] bg-black/60 px-2 py-0.5 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {plant.name}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Simulated Room Floor Line */}
              <div className="w-full border-t border-dashed border-white/20 pt-2 flex justify-between text-[11px] text-[#9DB0A3]/70 z-10">
                <span>Zona Sirkulasi Segar</span>
                <span>NASA Clean Air Benchmark</span>
              </div>

              {/* Ambient radial blur behind plants */}
              <div 
                className="absolute inset-0 bg-[#7BC043]/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500" 
                style={{ opacity: purityIndex / 100 }}
              />
            </div>

            {/* Bottom Bundle CTA */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9DB0A3] block">
                  Total Paket ({chosenPlants.length} Tanaman)
                </span>
                <span className="text-xl font-bold text-[#7BC043]">
                  {formatPrice(bundlePrice, currency)}
                </span>
              </div>

              <button
                type="button"
                disabled={chosenPlants.length === 0}
                onClick={handleAddBundle}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#7BC043] hover:bg-[#8ee04f] disabled:opacity-40 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#7BC043]/20"
              >
                <ShoppingBag size={16} />
                <span>Beli Paket Ruangan Ini</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
