import { useState } from 'react'

export default function ImagePicker({ label='Foto', value, onChange }) {
  const [preview, setPreview] = useState(value || '')

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result; // data:image/...;base64,...
      setPreview(base64);
      onChange(base64); // ⚠️ se guarda en photoUrl/avatarUrl
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="field">
      <label>{label}</label>
      {preview && <img src={preview} alt="preview" className="thumb" />}
      <input
        className="input"
        placeholder="https://url-de-imagen..."
        value={value || ''}
        onChange={e => { setPreview(e.target.value); onChange(e.target.value); }}
      />
      <div className="muted">O selecciona un archivo</div>
      <input type="file" accept="image/*" onChange={onFile}/>
      <small className="muted">* Para el backend se mandará el campo como texto (URL o base64).</small>
    </div>
  )
}
