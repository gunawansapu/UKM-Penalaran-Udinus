import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Check } from 'lucide-react'; // Import ikon Share dan Check

// =========================================
// 1. IMPORT GAMBAR (ASSETS)
// =========================================
import defaultProfileImg from '../assets/images/default_profile.png';

// --- BPH: KETUA ---
import ketuaImg from '../assets/images/ketua_formal.JPG';
import ketuaImgexecutif from '../assets/images/ketua_executf.JPG'; 
import ketuaImgbebas from '../assets/images/ketua_bebas.JPG'; 
import ketuaImgfreestyle from '../assets/images/ketua_freestyle.JPG'; 

// --- BPH: WAKIL ---
import wakilImg from '../assets/images/wakil_official.JPG';
import wakilImgexecutif from '../assets/images/wakil_executif.JPG';
import wakilImgsignature from '../assets/images/wakil_signature.JPG';
import wakilImgfreestyle from '../assets/images/wakil_freestyle.JPG';

// --- BPH: SEKRETARIS ---
import sekretarisImg from '../assets/images/sekre_official.JPG';
import sekretarisImgexecutif from '../assets/images/sekre_executif.JPG';
import sekretarisImgsignature from '../assets/images/sekre_signature.JPG';
import sekretarisImgfreestyle from '../assets/images/sekre_freestyle.JPG';

import sekre2Imgofficial from '../assets/images/auliya_official.JPG';
import sekre2Imgexecutif from '../assets/images/auliya_executif.JPG';
import sekre2Imgsignature from '../assets/images/auliya_signature.JPG';
import sekre2Imgfreestyle from '../assets/images/auliya_freestyle.JPG';

// --- BPH: BENDAHARA ---
import bendaharaImg from '../assets/images/benda_official.JPG';
import bendaharaImgexecutif from '../assets/images/benda_executif.JPG';
import bendaharaImgsignature from '../assets/images/benda_signature.JPG';
import bendaharaImgfreestyle from '../assets/images/benda_freestyle.JPG';

import bendahara2Imgofficial from '../assets/images/benda2_official.JPG';
import bendahara2Imgexecutif from '../assets/images/benda2_executif.JPG';
import bendahara2Imgsiganture from '../assets/images/benda2_signature.JPG';
import bendahara2Imgfreestyle from '../assets/images/benda2_freestyle.JPG';

// --- BPH: HUMAS ---
import humasImg from '../assets/images/humas_official.JPG';
import humasImgexecutif from '../assets/images/humas_executif.JPG';
import humasImgsignature from '../assets/images/humas_signature1.JPG';
import humasImgfreestyle from '../assets/images/humas_freestyle.JPG';

import humasImg2official from '../assets/images/humas2_official.JPG';
import humasImg2executif from '../assets/images/humas2_executif.JPG';
import humasImg2signature from '../assets/images/humas2_signature.JPG';
import humasImg2freestyle from '../assets/images/humas2_freestyle.JPG';

// --- DIVISI RISTEK ---
import ristekKadivImg from '../assets/images/kadivris_official.JPG';
import ristekKadivImgexecutif from '../assets/images/kadivris_executif.JPG';
import ristekKadivImgsignature from '../assets/images/kadivris_signature.JPG';
import ristekKadivImgfreestyle from '../assets/images/kadivris_freestyle.JPG';

import arfizanImg from '../assets/images/arfi_official.JPG';
import arfizanImgexecutif from '../assets/images/arfi_executif.JPG';
import arfizanImgsignature from '../assets/images/arfi_signature.JPG';
import arfizanImgfreestyle from '../assets/images/arfi_freestyle.JPG';

import aqilImgofficial from '../assets/images/aqil_official.JPG';
import aqilImgexecutif from '../assets/images/aqil_executif.JPG';
import aqilImgsignature from '../assets/images/aqil_signature.JPG';
import aqilImgfreestyle from '../assets/images/aqil_freestyle.JPG';

import hanifaImgofficial from '../assets/images/hanifa_official.JPG';
import hanifaImgexecutif from '../assets/images/hanifa_executif.JPG';
import hanifaImgsignature from '../assets/images/hanifa_signature.JPG';
import hanifaImgfreestyle from '../assets/images/hanifa_freestyle.JPG';

import nauvaImgofficial from '../assets/images/nauva_official.JPG';
import nauvaImgexecutif from '../assets/images/nauva_executif.JPG';
import nauvaImgsignature from '../assets/images/nauva_signature.JPG';

import febiImgofficial from '../assets/images/febi_official.JPG';
import febiImgexecutif from '../assets/images/febi_executif.JPG';
import febiImgsiganture from '../assets/images/febi_signature.JPG';
import febiImgfreestyle from '../assets/images/febi_freestyle.JPG';

import ameliaImg from '../assets/images/amelia.JPG';
import israImg from '../assets/images/isra.JPG';
import ibnuImg from '../assets/images/ibnu_official.jpeg';

// --- DIVISI PENGMAS ----
import iviankaImgofficial from '../assets/images/ivianka_official.JPG';
import iviankaImgexecutif from '../assets/images/ivianka_executif.JPG';
import iviankaImgsignature from '../assets/images/ivianka_signature.JPG';
import iviankaImgfreestyle from '../assets/images/ivianka_freestyle.JPG';

import kharidaImgofficial from '../assets/images/kharida_official.JPG';
import kharidaImgexecutif from '../assets/images/kharida_executif.JPG';
import kharidaImgsignature from '../assets/images/kharida_signature.JPG';
import kharidaImgfreestyle from '../assets/images/kharida_freestyle.JPG';

import halimaImg from '../assets/images/halima_official.JPG';
import halimaImgexecutif from '../assets/images/halima_executif.JPG';
import halimaImgsignature from '../assets/images/halima_signature.JPG';
import halimaImgfreestyle from '../assets/images/halima_freestyle.JPG';

import najwaImgofficial from '../assets/images/najwa_official.JPG';
import najwaImgexecutif from '../assets/images/najwa_executif.JPG';
import najwaImgsignature from '../assets/images/najwa_signature.JPG';
import najwaImgfreestyle from '../assets/images/najwa_freestyle.JPG';

import rindiImgofficial from '../assets/images/rindi_official.JPG';
import rindiImgexecutif from '../assets/images/rindi_executif.JPG';
import rindiImgsignature from '../assets/images/rindi_signature.JPG';
import rindiImgfreestyle from '../assets/images/rindi_freestyle.JPG';

import alfiImgofficial from '../assets/images/alfi_official.JPG';
import alfiImgexecutif from '../assets/images/alfi_executif.JPG';
import alfiImgsignature from '../assets/images/alfi_signature.JPG';
import alfiImgfreestyle from '../assets/images/alfi_freestyle.JPG';

import wafiqImgofficial from '../assets/images/wafiq_official.JPG';
import wafiqImgexecutif from '../assets/images/wafiq_executif.JPG';
import wafiqImgsignature from '../assets/images/wafiq_signature.JPG';
import wafiqImgfreestyle from '../assets/images/wafiq_freestyle.JPG';

import nadiapengmasImgofficial from '../assets/images/nadiapengmas_official.JPG';
import nadiapengmasImgexecutif from '../assets/images/nadiapengmas_executif.JPG';
import nadiapengmasImgsignature from '../assets/images/nadiapengmas_signature.JPG';
import nadiapengmasImgfreestyle from '../assets/images/nadiapengmas_freestyle.JPG';

import jeniferImgofficial from '../assets/images/jenifer_official.JPG';
import jeniferImgecxecutif from '../assets/images/jenifer_executif.JPG';
import jeniferImgsignature from '../assets/images/jenifer_signature.JPG';
import jeniferImgfreestyle from '../assets/images/jenifer_freestyle.JPG';

import caterineImgofficial from '../assets/images/caterine_official.JPG';
import caterineImgexecutif from '../assets/images/caterine_executif.JPG';
import caterineImgsignature from '../assets/images/caterine_signature.JPG';
import caterineImgfreestyle from '../assets/images/caterine_freestyle.JPG';

// --- MEDKREF ---
import medkrefKadivImg from '../assets/images/maul_official.JPG'; 
import medkrefKadivImgexecutif from '../assets/images/maul_executif.JPG'; 
import medkrefKadivImgsignature from '../assets/images/maul_signature.JPG'; 
import medkrefKadivImgfreestyle from '../assets/images/maul_freestyle.JPG'; 

import miftahulImg from '../assets/images/miftah_official.JPG';
import miftahulImgexecutif from '../assets/images/miftah_executif.JPG';
import miftahulImgsignature from '../assets/images/miftah_signature.JPG';
import miftahulImgfreestyle from '../assets/images/miftah_freestyle.JPG';

import dwikyImg from '../assets/images/dwiky_official.JPG';
import dwikyImgexecutif from '../assets/images/dwiky_executif.JPG';
import dwikyImgsignature from '../assets/images/dwiky_signature.JPG';
import dwikyImgfreestyle from '../assets/images/dwiky_freestyle.JPG';

import faridImgofficial from '../assets/images/farid_official.JPG';
import faridImgexecutif from '../assets/images/farid_executif.JPG';
import faridImgsignature from '../assets/images/farid_signature.JPG';
import faridImgfreestyle from '../assets/images/farid_freestyle.JPG';

import gheitsaimgofficial from '../assets/images/gheitsa_official.JPG';
import gheitsaimgexecutif from '../assets/images/gheitsa_executif.JPG';
import gheitsaimgsignature from '../assets/images/gheitsa_signature.JPG';
import gheitsaimgfreestyle from '../assets/images/gheitsa_freestyle.JPG';

import adindaImgofficial from '../assets/images/adinda_official.JPG';
import adindaImgexecutif from '../assets/images/adinda_executif.JPG';
import adindaImgsignature from '../assets/images/adinda_signature.JPG';
import adindaImgfreestyle from '../assets/images/adinda_freestyle.JPG';

import novaImgofficial from '../assets/images/nova_official.JPG';
import novaImgexecutif from '../assets/images/nova_executif.JPG';
import novaImgsignature from '../assets/images/nova_signature.JPG';
import novaImgfreestyle from '../assets/images/nova_freestyle.JPG';

// --- GRUP IMAGE ---
import grupketuwaImg from '../assets/images/grup_ketuwa.JPG';
import grupsekre from '../assets/images/grupsekre.JPG';
import grupbenda from '../assets/images/grupbenda.JPG';
import gruphumas from '../assets/images/gruphumas.JPG';
import grupristek from '../assets/images/grupristek.JPG';
import gruppengmas from '../assets/images/gruppengmas.JPG';
import grupmedkref from '../assets/images/grupmedkref.JPG';


const OurTeam = () => {
  const [activeTab, setActiveTab] = useState('ketua'); 
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [photoMode, setPhotoMode] = useState(0); 
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Ref untuk Story Card
  const storyCardRef = useRef(null);

  useEffect(() => {
    setActiveMemberIndex(0);
    setPhotoMode(0);
  }, [activeTab]);

  const photoModes = [
    { id: 0, label: 'Official', key: 'image1' },    
    { id: 1, label: 'Executive', key: 'image2' },   
    { id: 2, label: 'Signature', key: 'image3' },   
    { id: 3, label: 'Freestyle', key: 'image4' },   
  ];

  const navTabs = [
    { id: 'ketua', label: '𝓚𝓮𝓽𝓾𝓪' },
    { id: 'wakil', label: '𝓦𝓪𝓴𝓲𝓵 𝓚𝓮𝓽𝓾𝓪' },
    { id: 'sekretaris', label: '𝓢𝓮𝓴𝓻𝓮𝓽𝓪𝓻𝓲𝓼' },
    { id: 'bendahara', label: '𝓑𝓮𝓷𝓭𝓪𝓱𝓪𝓻𝓪' },
    { id: 'humas', label: '𝓗𝓾𝓶𝓪𝓼' },
    { id: 'ristek', label: '𝓡𝓲𝓼𝓽𝓮𝓴' },
    { id: 'pengmas', label: '𝓟𝓮𝓷𝓰𝓶𝓪𝓼' },
    { id: 'medkref', label: '𝓜𝓮𝓭𝓴𝓻𝓮𝓯' }
  ];

  // 2. SISTEM POSISI CERDAS
  const getSmartPositionCSS = (member, modeId) => {
    if (member.customPos && member.customPos[modeId]) {
      const val = member.customPos[modeId];
      if(val.includes('object-top')) return '50% 0%';
      if(val.includes('object-center')) return '50% 50%';
      const match = val.match(/object-\[(.*?)\]/);
      if (match) return match[1].replace('_', ' ');
      return '50% 50%';
    }
    const frameType = member.frameType || 'standard';
    switch (frameType) {
        case 'closeup': return '50% 0%'; 
        case 'standard':
        default:
            switch (modeId) {
                case 0: return '50% 0%'; 
                case 1: return '50% 25%'; 
                case 2: return '50% 0%'; 
                case 3: return '50% 20%'; 
                default: return '50% 50%';
            }
    }
  };

  const getSmartPositionClass = (member, modeId) => {
    if (member.customPos && member.customPos[modeId]) return member.customPos[modeId];
    const frameType = member.frameType || 'standard';
    switch (frameType) {
        case 'closeup': return 'object-top';
        default:
            switch (modeId) {
                case 0: return 'object-top';
                case 1: return 'object-[50%_25%]';
                case 2: return 'object-top';
                case 3: return 'object-[50%_20%]'; 
                default: return 'object-center';
            }
    }
  };

  // 3. DATA TEAM
  const teamData = {
    ketua: {
      label: 'Ketua Umum',
      groupImage: grupketuwaImg,
      groupDesc: 'Pimpinan UKM Penalaran Periode 2025/2026',
      members: [
        { 
          name: '𝓚𝓪𝔂𝓵𝓪 𝓐𝓼𝓼𝓲𝓯𝓪 𝓡𝓲𝔃𝓺𝓲 𝓤𝓽𝓪𝓶𝓲', 
          role: 'Ketua UKM Penalaran', 
          image1: ketuaImg, image2: ketuaImgexecutif, image3: ketuaImgbebas, image4: ketuaImgfreestyle, 
          frameType: 'standard', 
          desc: 'Memimpin dan mengkoordinasi seluruh kegiatan UKM dengan visi visioner.'
        }
      ]
    },
    wakil: {
      label: 'Wakil Ketua',
      groupImage: grupketuwaImg,
      groupDesc: 'Pimpinan UKM Penalaran Periode 2025/2026',
      members: [
        { 
          name: '𝓓𝓲𝓪𝓱 𝓐𝓹𝓻𝓲𝓮𝓼𝓪 𝓜𝓪𝓲𝓶𝓾𝓷𝓪 𝓢𝓪𝓻𝓲', 
          role: 'Wakil Ketua', 
          image1: wakilImg, image2: wakilImgexecutif, image3: wakilImgsignature, image4: wakilImgfreestyle, 
          frameType: 'closeup', 
          desc: 'Mendampingi ketua dan menjaga harmonisasi internal organisasi.'
        }
      ]
    },
    sekretaris: {
      label: 'Sekretaris',
      groupImage: grupsekre,
      groupDesc: 'Tim Kesekretariatan yang Handal',
      members: [
        { 
          name: '𝓐𝓻𝓲𝓪𝓷𝓽𝓲 𝓞𝓵𝓽𝔂𝓪 𝓢𝓮𝓽𝓲𝓪𝔀𝓪𝓷', role: 'Sekretaris Umum', 
          image1: sekretarisImg, image2: sekretarisImgexecutif, image3: sekretarisImgsignature, image4: sekretarisImgfreestyle, 
          frameType: 'closeup', 
          desc: 'Mengelola administrasi organisasi dengan ketelitian tinggi.'
        },
        { 
          name: '𝓐𝓾𝓵𝓲𝔂𝓪 𝓤𝓻𝓻𝓸𝓼𝔂𝓲𝓭𝓪𝓱', role: 'Staff Sekretaris', 
          image1: sekre2Imgofficial, image2: sekre2Imgexecutif, image3: sekre2Imgsignature, image4: sekre2Imgfreestyle, 
          desc: 'Membantu pengelolaan arsip dan database kesekretariatan.'
        }
      ]
    },
    bendahara: {
      label: 'Bendahara',
      groupImage: grupbenda,
      groupDesc: 'Tim Keuangan yang Transparan',
      members: [
        { 
          name: '𝓡𝓲𝓴𝓱𝓪 𝓜𝓪𝓱𝓪𝓻𝓪𝓷𝓲', role: 'Bendahara Umum', 
          image1: bendaharaImg, image2: bendaharaImgexecutif, image3: bendaharaImgsignature, image4: bendaharaImgfreestyle, 
          customPos: { 3: 'object-[50%_15%]' }, 
          desc: 'Bertanggung jawab atas sirkulasi keuangan dan transparansi anggaran.'
        },
        { 
          name: '𝓐𝓵𝓲𝓯 𝓒𝓪𝓷𝓭𝓪 𝓡𝓪𝓶𝓪𝓭𝓪𝓷𝓲', role: 'Staff Bendahara', 
          image1: bendahara2Imgofficial, image2: bendahara2Imgexecutif, image3: bendahara2Imgsiganture, image4: bendahara2Imgfreestyle, 
          customPos: { 3: 'object-[50%_20%]' },
          desc: 'Membantu pembukuan dan manajemen aset organisasi.'
        }
      ]
    },
    humas: {
      label: 'Divisi Humas',
      groupImage: gruphumas,
      groupDesc: 'Garda Terdepan Komunikasi',
      members: [
        { 
          name: '𝓢𝓪𝓵𝔀𝓪 𝓓𝓮𝓿𝓲𝓽𝓪 𝓢𝓪𝓻𝓲', role: 'Kadiv Humas', 
          image1: humasImg, image2: humasImgexecutif, image3: humasImgsignature, image4: humasImgfreestyle, 
          customPos: { 3: 'object-[50%_15%]' },
          desc: 'Membangun citra positif dan relasi eksternal UKM.'
        },
        { 
          name: '𝓝𝓪𝓭𝓲𝓪 𝓝𝔂𝓼𝓼𝓪 𝓘𝓬𝓪𝓼𝓲𝓪', role: 'Staff Humas', 
          image1: humasImg2official, image2: humasImg2executif, image3: humasImg2signature, image4: humasImg2freestyle, 
          customPos: { 0: 'object-[50%_15%]' }, 
          frameType: 'closeup',
          desc: 'Menjadi garda terdepan dalam komunikasi publik.'
        }
      ]
    },
    ristek: {
      label: 'Divisi Ristek',
      groupImage: grupristek,
      groupDesc: 'Inovator Teknologi dan Riset',
      members: [
        { 
          name: '𝓖𝓾𝓷𝓪𝔀𝓪𝓷 𝓒𝓱𝓸𝓵𝓲𝓼 𝓢𝓪𝓹𝓾𝓽𝓻𝓪', role: 'Kadiv Ristek', 
          image1: ristekKadivImg, image2: ristekKadivImgexecutif, image3: ristekKadivImgsignature, image4: ristekKadivImgfreestyle, 
          desc: 'Mengembangkan inovasi teknologi dan riset berbasis data.'
        },
        { 
          name: '𝓐𝓻𝓯𝓲𝔃𝓪𝓷 𝓡𝓪𝓫𝓫𝓪𝓷𝓲', role: 'Staff Ristek', 
          image1: arfizanImg, image2: arfizanImgexecutif , image3:  arfizanImgsignature, image4: arfizanImgfreestyle, 
          customPos: { 0: 'object-top' }, 
          desc: 'Spesialis implementasi sistem dan pengembangan web.'
        },
        { 
          name: '𝓐𝓶𝓮𝓵𝓲𝓪 𝓒𝓪𝓵𝓲𝓼𝓽𝓪', role: 'Staff Ristek', 
          image1: ameliaImg, image2: defaultProfileImg, image3: defaultProfileImg, image4: defaultProfileImg, 
          desc: 'Fokus pada riset mendalam dan analisis pengembangan.'
        },
        { 
          name: '𝓘𝓼𝓻𝓪 𝓢𝓱𝓪𝓱𝔃𝓪𝓭𝓪 𝓐', role: 'Staff Ristek', 
          image1: israImg, image2: defaultProfileImg, image3: defaultProfileImg, image4: defaultProfileImg, 
          frameType: 'closeup', 
          desc: 'Menyelesaikan masalah dengan teknologi dan riset'
        },
        { name: '𝓜𝓾𝓱𝓪𝓶𝓶𝓪𝓭 𝓕𝓾𝓪𝓭 𝓐𝓺𝓲𝓵𝓪', role: 'Staff Ristek', image1: aqilImgofficial, image2: aqilImgexecutif, image3:aqilImgsignature, image4: aqilImgfreestyle, desc: 'Eksplorasi teknologi baru.' },
        { name: '𝓐𝓭𝔂 𝓡𝓪𝔂𝔂𝓪𝓷', role: 'Staff Ristek', image1: defaultProfileImg, image2: defaultProfileImg, image3: defaultProfileImg, image4: defaultProfileImg, desc: 'Kreativitas dalam coding.' },
        { name: '𝓘𝓫𝓷𝓾 𝓗𝓪𝓷𝓪𝓯𝓲 𝓐𝓼𝓼𝓪𝓵𝓪𝓶', role: 'Staff Ristek', image1:ibnuImg, image2: defaultProfileImg, image3: defaultProfileImg, image4: defaultProfileImg, desc: 'Berdedikasi pada kemajuan riset.' },
        { name: '𝓝𝓪𝓾𝓿𝓪 𝓒𝓪𝓱𝓪𝔂𝓪𝓷𝓲𝓷𝓰', role: 'Staff Ristek', image1: nauvaImgofficial , image2: nauvaImgexecutif, image3: nauvaImgsignature , image4: defaultProfileImg, desc: 'Ide segar untuk inovasi.' },
        { name: '𝓣𝓻𝓲 𝓕𝓮𝓫𝓲𝓪𝓷𝓪', role: 'Staff Ristek', image1: febiImgofficial, image2: febiImgexecutif , image3:  febiImgsiganture, image4: febiImgfreestyle , desc: 'Semangat belajar tinggi.' },
        { name: '𝓗𝓪𝓷𝓲𝓯𝓪 𝓜𝓾𝓽𝓶𝓪𝓲𝓷𝓪𝓱', role: 'Staff Ristek', image1: hanifaImgofficial, image2: hanifaImgexecutif, image3: hanifaImgsignature, image4:hanifaImgfreestyle, desc: 'Konsisten dan teliti.' }
      ]
    },
    pengmas: {
      label: 'Divisi Pengmas',
      groupImage: gruppengmas,
      groupDesc: 'Mengabdi Sepenuh Hati',
      members: [
        { 
          name: '𝓘𝓿𝓲𝓪𝓷𝓴𝓪 𝓡𝓮𝓿𝓪 𝓐𝓶𝓪𝓷𝓭𝓪', role: 'Kadiv Pengmas', 
          image1: iviankaImgofficial, image2: iviankaImgexecutif , image3: iviankaImgsignature, image4: iviankaImgfreestyle , 
          desc: 'Mengelola program pengabdian masyarakat yang berdampak.'
        },
        { 
          name: '𝓗𝓪𝓵𝓲𝓶𝓪 𝓐𝓻𝓲𝓷𝓷𝓲𝓼𝓪', role: 'Staff Pengmas', 
          image1: halimaImg, image2: halimaImgexecutif, image3: halimaImgsignature, image4: halimaImgfreestyle , 
          desc: 'Kepedulian sosial yang tinggi untuk sesama.'
        },
        { name: '𝓝𝓪𝓳𝔀𝓪 𝓜𝓮𝓵𝓪𝓷𝓽𝓲𝓷', role: 'Staff Pengmas', image1: najwaImgofficial, image2: najwaImgexecutif, image3: najwaImgsignature, image4: najwaImgfreestyle, desc: 'Aktif dalam kegiatan sosial.' },
        { name: '𝓡𝓲𝓷𝓭𝓲𝔂𝓪𝓷𝓲 𝓝𝓪𝓲𝓶𝓪𝓱', role: 'Staff Pengmas', image1: rindiImgofficial, image2: rindiImgexecutif, image3: rindiImgsignature, image4: rindiImgfreestyle, desc: 'Tulus mengabdi.' },
        { name: '𝓐𝓵𝓯𝓲𝔂𝔂𝓪𝓽𝓾𝓼 𝓢𝓪\'𝓪𝓭𝓪𝓱', role: 'Staff Pengmas', image1: alfiImgofficial, image2: alfiImgexecutif, image3: alfiImgsignature, image4: alfiImgfreestyle, desc: 'Menebar kebaikan.' },
        { name: '𝓦𝓪𝓯𝓲𝓺 𝓐𝔃𝓲𝔃𝓪𝓱', role: 'Staff Pengmas', image1: wafiqImgofficial, image2: wafiqImgexecutif, image3: wafiqImgsignature, image4: wafiqImgfreestyle, desc: 'Semangat berkontribusi.' },
        { name: '𝓝𝓪𝓭𝓲𝓪 𝓡𝓪𝓲𝓼𝓪', role: 'Staff Pengmas', image1: nadiapengmasImgofficial, image2: nadiapengmasImgexecutif, image3: nadiapengmasImgsignature, image4: nadiapengmasImgfreestyle, desc: 'Partisipasi aktif.' },
        { name: '𝓚𝓱𝓪𝓻𝓲𝓭𝓪 𝓕𝓪𝓱𝓶𝓪', role: 'Staff Pengmas', image1: kharidaImgofficial, image2: kharidaImgexecutif, image3: kharidaImgsignature, image4: kharidaImgfreestyle, desc: 'Dedikasi untuk masyarakat.' },
        { name: '𝓙𝓮𝓷𝓷𝓲𝓯𝓮𝓻 𝓐𝓾𝓵𝓲𝓪', role: 'Staff Pengmas', image1: jeniferImgofficial, image2: jeniferImgecxecutif, image3: jeniferImgsignature, image4: jeniferImgfreestyle, desc: 'Empati yang kuat.' },
        { name: '𝓒𝓱𝓪𝓽𝓮𝓻𝓲𝓷𝓮 𝓥𝓪𝓻𝓲𝓼𝓱𝓪', role: 'Staff Pengmas', image1: caterineImgofficial, image2: caterineImgexecutif, image3: caterineImgsignature, image4: caterineImgfreestyle, desc: 'Solidaritas tinggi.' }
      ]
    },
    medkref: {
      label: 'Divisi Medkref',
      groupImage: grupmedkref,
      groupDesc: 'Kreativitas Tanpa Batas',
      members: [
        { 
          name: '𝓓𝔀𝓲 𝓜𝓪𝓾𝓵𝔂𝓭𝓪 𝓐𝓷𝓰𝓰𝓻𝓪𝓮𝓷𝓲', role: 'Kadiv Medkref', 
          image1: medkrefKadivImg, image2: medkrefKadivImgexecutif , image3: medkrefKadivImgsignature, image4: medkrefKadivImgfreestyle, 
          desc: 'Menciptakan identitas visual UKM yang estetik dan kreatif.'
        },
        { 
          name: '𝓜𝓲𝓯𝓽𝓪𝓱𝓾𝓵 𝓗𝓾𝓭𝓪', role: 'Staff Medkref', 
          image1: miftahulImg, image2: miftahulImgexecutif , image3: miftahulImgsignature, image4: miftahulImgfreestyle , 
          desc: 'Desainer grafis dengan kreativitas tanpa batas.'
        },
        { name: '𝓓𝔀𝓲𝓴𝔂 𝓐𝓭𝓲 𝓜𝓪𝓱𝓮𝓷𝓭𝓻𝓪', role: 'Staff Medkref', image1: dwikyImg, image2: dwikyImgexecutif, image3:dwikyImgsignature, image4: dwikyImgfreestyle , desc: 'Kreatif dalam visual art.' },
        { name: '𝓖𝓱𝓪𝓲𝓽𝓼𝓪 𝓩𝓪𝓱𝓲𝓻𝓪', role: 'Staff Medkref', image1: gheitsaimgofficial, image2: gheitsaimgexecutif, image3: gheitsaimgsignature, image4: gheitsaimgfreestyle, desc: 'Content creator inovatif.' },
        { name: '𝓐𝓭𝓲𝓷𝓭𝓪 𝓚𝓾𝓶𝓪𝓵𝓪𝓼𝓪𝓻𝓲', role: 'Staff Medkref', image1: adindaImgofficial, image2: adindaImgexecutif, image3: adindaImgsignature, image4: adindaImgfreestyle, desc: 'Detail dalam desain.' },
        { name: '𝓝𝓸𝓿𝓪 𝓐𝓻𝓭𝓱𝓲𝓪𝓷𝓼𝔂𝓪𝓱', role: 'Staff Medkref', image1: novaImgofficial, image2: novaImgexecutif, image3: novaImgsignature, image4: novaImgfreestyle, desc: 'Multimedia specialist.' },
        { name: '𝓕𝓪𝓻𝓲𝓭 𝓕𝓪𝓭𝓵𝓲𝓪𝓷', role: 'Staff Medkref', image1: faridImgofficial, image2: faridImgexecutif, image3: faridImgsignature, image4: faridImgfreestyle, desc: 'Fotografi enthusiast.' }
      ]
    }
  };

  const currentGroup = teamData[activeTab]?.members || [];
  const currentMember = currentGroup[activeMemberIndex] || currentGroup[0];
  const showThumbnails = currentGroup.length > 1;

  const groupData = {
    image: teamData[activeTab]?.groupImage || defaultProfileImg,
    desc: teamData[activeTab]?.groupDesc || ''
  };

  // FUNGSI SHARE IG STORY
  const handleShareToIG = async () => {
    if (!storyCardRef.current || isGeneratingStory) return;
    setIsGeneratingStory(true);
    setDownloadSuccess(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); 
      const canvas = await html2canvas(storyCardRef.current, {
        scale: 2, 
        backgroundColor: '#ffffff', // Background putih
        useCORS: true,
        allowTaint: true,
        logging: false, 
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Story-${currentMember.name.replace(/\s+/g, '-')}.png`;
      link.click();
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);

    } catch (err) {
      console.error("Error creating story:", err);
      alert("Gagal membuat story. Coba lagi.");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  if (!currentMember) return null; 

  return (
    <section className="py-16 relative overflow-hidden font-sans bg-[#f8fafc]">
      
      {/* Light Mode Ambient Decorations / MURAL WARNA-WARNI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Blob Ungu, Biru, Pink untuk efek mural */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/50 rounded-full blur-[100px] mix-blend-multiply opacity-80 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-300/50 rounded-full blur-[100px] mix-blend-multiply opacity-80 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[120px] mix-blend-multiply opacity-80 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              𝒪𝓊𝓇 𝒯𝑒𝒶𝓂
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Sinergi tanpa batas untuk memajukan UKM Penalaran.
          </p>
        </div>

        {/* 1. NAV TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            {navTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border overflow-hidden group ${
                        activeTab === tab.id
                        ? '!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !border-transparent shadow-lg scale-105'
                        : '!bg-white !text-slate-600 !border-slate-200 hover:!bg-slate-50 hover:!text-indigo-600'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* === MAIN CARD === */}
        <div className="relative !bg-white/60 backdrop-blur-xl border border-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[550px] flex flex-col lg:flex-row mb-16">
            
            {/* KIRI: FOTO BESAR */}
            <div className="lg:w-1/2 relative bg-slate-100 group min-h-[400px] lg:h-auto overflow-hidden">
                
                {/* SHARE BUTTON: Warna Putih Elegan Teks Indigo, Icon Share2 */}
                <button 
                  onClick={handleShareToIG}
                  disabled={isGeneratingStory}
                  style={{
                      backgroundColor: 'rgba(255,255,255,0.9)', 
                      borderColor: 'rgba(0,0,0,0.1)',
                      color: '#4f46e5'
                  }}
                  className="absolute top-4 right-4 z-50 p-3 rounded-full border transition-all duration-300 shadow-sm cursor-pointer hover:bg-white hover:scale-105 flex items-center justify-center gap-2"
                  title="Bagikan"
                >
                   {isGeneratingStory ? (
                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" style={{ color: '#4f46e5' }}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   ) : downloadSuccess ? (
                     <Check className="w-5 h-5" />
                   ) : (
                     <Share2 className="w-5 h-5" />
                   )}
                   <span className="hidden sm:inline font-bold text-sm">
                     {downloadSuccess ? 'Tersimpan!' : 'Bagikan'}
                   </span>
                </button>

                {/* LOOPING 4 FOTO */}
                {photoModes.map((mode) => (
                    <img 
                        key={mode.id}
                        src={currentMember[mode.key] || defaultProfileImg} 
                        alt={`${currentMember.name} ${mode.label}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${getSmartPositionClass(currentMember, mode.id)} 
                        ${photoMode === mode.id ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                    />
                ))}
                
                {/* Gradient Overlay Dibuat Sangat Minimal Hanya Di Bawah Saja (Agar wajah tidak tertutup putih) */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none"></div>

                {/* 2. TOMBOL 4 MODE */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-full px-4 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 !bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-slate-200 shadow-sm">
                        {photoModes.map((mode) => (
                            <button 
                                key={mode.id}
                                type="button"
                                onClick={() => setPhotoMode(mode.id)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all duration-300 ${
                                    photoMode === mode.id 
                                    ? '!bg-gradient-to-r !from-indigo-600 !to-purple-500 !text-white shadow-md' 
                                    : '!bg-transparent !text-slate-500 hover:!bg-slate-100 hover:!text-slate-900'
                                }`}
                            >
                                {mode.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* KANAN: INFO */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative !bg-white/40">
                <div key={currentMember.name} className="animate-fadeInRight space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full !bg-indigo-50 border border-indigo-100 mb-4 shadow-sm">
                            <span className="w-2 h-2 rounded-full !bg-indigo-500 animate-pulse"></span>
                            <span className="text-indigo-700 text-xs font-bold tracking-wider uppercase">
                                {teamData[activeTab].label}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                            {currentMember.name}
                        </h3>
                        <p className="text-lg text-indigo-600 mt-2 font-bold">
                            {currentMember.role}
                        </p>
                    </div>

                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>

                    <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 !border-indigo-300 pl-4 font-medium">
                        "{currentMember.desc || 'Berkomitmen untuk kemajuan organisasi.'}"
                    </p>

                    <div className="flex gap-4 pt-4">
                         <div className="w-10 h-10 rounded-lg !bg-white border !border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-pink-500 hover:!border-pink-300 hover:!bg-pink-50 transition-colors cursor-pointer group">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                         </div>
                         <div className="w-10 h-10 rounded-lg !bg-white border !border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:!border-blue-300 hover:!bg-blue-50 transition-colors cursor-pointer group">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. THUMBNAILS */}
        {showThumbnails && (
            <div className="animate-fadeInUp mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 !bg-slate-300"></div>
                    <h4 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                        Anggota Tim {teamData[activeTab].label}
                    </h4>
                    <div className="h-px w-12 !bg-slate-300"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {currentGroup.map((member, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveMemberIndex(index)}
                            type="button"
                            className={`group relative transition-all duration-300 outline-none !bg-transparent ${
                                activeMemberIndex === index 
                                ? 'scale-110 -translate-y-2 z-10' 
                                : 'opacity-100 hover:-translate-y-1'
                            }`}
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 !bg-white shadow-sm ${
                                activeMemberIndex === index 
                                ? 'ring-4 !ring-indigo-500 shadow-[0_10px_20px_rgba(99,102,241,0.3)]' 
                                : 'ring-2 !ring-slate-200 group-hover:!ring-indigo-300'
                            }`}>
                                <img 
                                    src={member.image1} 
                                    alt={member.name} 
                                    className={`w-full h-full object-cover transform transition-transform duration-500 ${getSmartPositionClass(member, 0)} ${
                                        activeMemberIndex === index ? 'scale-110' : 'scale-100 group-hover:scale-110'
                                    }`}
                                />
                                {activeMemberIndex !== index && (
                                    <div className="absolute inset-0 !bg-slate-900/10 group-hover:!bg-transparent transition-colors"></div>
                                )}
                            </div>
                            
                            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                                activeMemberIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                            }`}>
                                <span className="block text-[10px] font-bold !text-slate-700 !bg-white border !border-slate-200 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                                    {member.name.split(' ')[0]}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* 4. FOTO BARENG DIVISI (DI BAWAH) */}
        <div className="animate-fadeInUp relative z-10 mt-12 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl">
            <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Keluarga Besar <span className="text-indigo-600">{teamData[activeTab].label}</span>
                </h3>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                    {groupData.desc || 'Kebersamaan dan kekompakan tim kami.'}
                </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm max-h-[600px] flex items-center justify-center p-2">
                <img 
                    src={groupData.image} 
                    alt={`Foto Bareng ${teamData[activeTab].label}`}
                    className="max-w-full max-h-[580px] object-cover rounded-[1.5rem] hover:scale-105 transition-transform duration-700"
                />
            </div>
        </div>

      </div>

      {/* =================================================================
          HIDDEN STORY CARD (PURE HTML/CSS - LIGHT THEME)
      ================================================================= */}
      <div 
        ref={storyCardRef}
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '1080px',
            height: '1920px',
            zIndex: -10, 
            background: '#ffffff', // Light background
            backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            fontFamily: 'sans-serif',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            color: '#0f172a' // Dark text
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '1200px', height: '1200px', background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', opacity: 0.15, filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-20%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', opacity: 0.15, filter: 'blur(80px)' }}></div>

        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                <div style={{ 
                    padding: '16px 40px', 
                    borderRadius: '50px', 
                    background: '#ffffff', 
                    border: '2px solid #e2e8f0',
                    color: '#4f46e5',
                    fontSize: '32px',
                    fontWeight: '900',
                    letterSpacing: '2px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                    UKM PENALARAN
                </div>
            </div>

            <div style={{ 
                flex: 1, 
                position: 'relative', 
                borderRadius: '80px', 
                overflow: 'hidden', 
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                border: '12px solid #ffffff',
                backgroundColor: '#e2e8f0'
            }}>
                <img 
                    src={currentMember[photoModes[photoMode].key] || defaultProfileImg}
                    alt="Story"
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: getSmartPositionCSS(currentMember, photoMode) 
                    }}
                />
                
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 100%)', 
                    padding: '60px',
                    paddingTop: '150px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <span style={{ height: '6px', width: '60px', background: '#A855F7', borderRadius: '10px' }}></span>
                        <span style={{ color: '#D8B4FE', fontSize: '32px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {teamData[activeTab].label}
                        </span>
                    </div>
                    
                    <h1 style={{ color: '#ffffff', fontSize: '80px', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {currentMember.name}
                    </h1>
                    
                    <p style={{ color: '#94A3B8', fontSize: '40px', fontWeight: '500' }}>
                        {currentMember.role}
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '60px', padding: '50px', background: '#ffffff', borderRadius: '50px', border: '2px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#475569', fontSize: '36px', fontStyle: 'italic', lineHeight: '1.5', fontWeight: '500' }}>
                    "{currentMember.desc || 'Berkomitmen untuk kemajuan organisasi.'}"
                </p>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center', color: '#64748b', fontSize: '28px', fontWeight: '700', letterSpacing: '2px' }}>
                <span style={{ color: '#6366f1' }}>@</span>penalaranudinus
            </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OurTeam;