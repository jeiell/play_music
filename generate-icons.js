#!/usr/bin/env node

/**
 * Script para gerar ícones PNG do SVG
 * Use: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// SVG simples com o design do app
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#df3850;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e67e22;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="#1a080a"/>
  <circle cx="256" cy="256" r="220" fill="url(#grad)"/>
  <circle cx="256" cy="256" r="200" fill="#df3850"/>
  <path d="M 180 150 Q 256 210 256 290 Q 256 370 180 430" stroke="#1a080a" stroke-width="20" fill="none" stroke-linecap="round"/>
  <circle cx="256" cy="256" r="50" fill="#1a080a"/>
  <polygon points="210,210 210,302 310,256" fill="#1a080a"/>
</svg>`;

// Função para criar PNG usando Canvas simulado
// Como alternativa, usar ImageMagick ou ferramenta online
async function generateIcons() {
  try {
    // Tenta usar sharp se disponível
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.log('📦 Sharp não instalado. Instalando...');
      const { execSync } = require('child_process');
      execSync('npm install sharp', { stdio: 'inherit' });
      sharp = require('sharp');
    }

    const __dirname = path.dirname(path.resolve(__filename));

    // Salvar SVG temporário
    const svgPath = path.join(__dirname, 'icon-temp.svg');
    fs.writeFileSync(svgPath, svgIcon);

    // Gerar ícone 192x192
    await sharp(svgPath)
      .resize(192, 192, { fit: 'contain', background: { r: 26, g: 8, b: 10, alpha: 1 } })
      .png()
      .toFile(path.join(__dirname, 'icon-192.png'));
    console.log('✅ Ícone 192x192 gerado!');

    // Gerar ícone 512x512
    await sharp(svgPath)
      .resize(512, 512, { fit: 'contain', background: { r: 26, g: 8, b: 10, alpha: 1 } })
      .png()
      .toFile(path.join(__dirname, 'icon-512.png'));
    console.log('✅ Ícone 512x512 gerado!');

    // Limpar SVG temporário
    fs.unlinkSync(svgPath);

    console.log('\n✨ Ícones gerados com sucesso!');
    console.log('Os ícones estão prontos para o PWA.');
  } catch (error) {
    console.error('Erro ao gerar ícones:', error.message);
    console.log('\n💡 Alternativa: Use uma ferramenta online como:');
    console.log('   - https://www.favicon-generator.org/');
    console.log('   - https://convertio.co/svg-png/');
  }
}

generateIcons();
