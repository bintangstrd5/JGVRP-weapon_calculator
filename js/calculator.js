(() => {
'use strict';
// Material rates and recipes transcribed from the user's price table.
const weapons={
 'Combat Pistol':{cost:2000,ammoPerCraft:12,ammoCost:12.50},
 'Heavy Pistol':{cost:3100,ammoPerCraft:18,ammoCost:18.75},
 'Machine Pistol':{cost:6000,ammoPerCraft:12,ammoCost:41.25},
 'Sawn Off Shotgun':{cost:3750,ammoPerCraft:8,ammoCost:41.25},
 'Pump Shotgun':{cost:4800,ammoPerCraft:8,ammoCost:41.25}
};
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
document.querySelectorAll('.weapon-select').forEach(s=>Object.keys(weapons).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;s.appendChild(o)}));
const $=id=>document.getElementById(id);
$('calculator-form').addEventListener('submit',e=>{e.preventDefault();let total=0,rows=[];
for(let i=1;i<=3;i++){const name=$(`weapon-${i}`).value,field=$(`ammo-${i}`),ammo=Number(field.value||0);if(!Number.isInteger(ammo)||ammo<0){alert(`Jumlah peluru slot ${i} harus bilangan bulat 0 atau lebih.`);field.focus();return}if(!name)continue;const w=weapons[name],crafts=ammo===0?0:Math.ceil(ammo/w.ammoPerCraft),ammoCost=crafts*w.ammoCost,cost=w.cost+ammoCost;total+=cost;rows.push({name,ammo,crafts,ammoPerCraft:w.ammoPerCraft,weaponCost:w.cost,ammoCost,cost})}
const list=$('breakdown');list.replaceChildren();if(!rows.length){const p=document.createElement('p');p.className='hint';p.textContent='Pilih minimal satu senjata untuk menghitung modal.';list.appendChild(p)}
rows.forEach(r=>{const line=document.createElement('div');line.className='item-row';const left=document.createElement('span'),title=document.createElement('strong'),sub=document.createElement('small'),right=document.createElement('span');title.textContent=r.name;sub.className='item-sub';sub.textContent=`Senjata ${fmt(r.weaponCost)} · Ammo ${r.ammo} (${r.crafts} craft × ${r.ammoPerCraft}) = ${fmt(r.ammoCost)}`;left.append(title,sub);right.className='badge-modal';right.textContent=fmt(r.cost);line.append(left,right);list.appendChild(line)});
$('total-cost').textContent=fmt(total);const raw=$('selling-price').value,has=raw.trim()!=='';$('profit-box').hidden=!has;$('check-only').hidden=has;if(has){const selling=Number(raw);if(!Number.isFinite(selling)||selling<0){alert('Harga jual harus angka 0 atau lebih.');$('selling-price').focus();return}const profit=selling-total;$('profit').textContent=fmt(profit);$('profit').style.color=profit>=0?'var(--accent-green)':'var(--accent-red)';$('margin').textContent=`Margin terhadap penjualan: ${(selling>0?profit/selling*100:0).toFixed(2)}%`}$('result').hidden=false;$('result').scrollIntoView({behavior:'smooth',block:'start'});
});
})();
