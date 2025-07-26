import React, { useState } from 'react';

export const eyecatchData = [
  {
    "name": "読書日記 ｜ 6/2〜6/8",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/202363589/rectangle_large_type_2_bebfdeed13350503d27f064e79a33c9a.jpeg",
    "created_at": "2025.07.15",
    "noteUrl": "https://note.com/izuha0/n/ne6fe022e5b90"
  },
  {
    "name": "読書日記 ｜ 5/26〜6/1",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/201380667/rectangle_large_type_2_ec80fa8eb3c7f63c55748ce229eb0710.jpeg",
    "created_at": "2025.07.10",
    "noteUrl": "https://note.com/izuha0/n/nc5a3fee13c1d"
  },
  {
    "name": "読書日記 ｜ 5/19〜5/25",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/197627035/rectangle_large_type_2_4fd1f39ba337c0c5b3f137133ea368d0.jpeg",
    "created_at": "2025.06.22",
    "noteUrl": "https://note.com/izuha0/n/n48da4f4cd3dd"
  },
  {
    "name": "読書日記 ｜ 5/12〜5/18",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/193621020/rectangle_large_type_2_e3bbf10807b0ae27b28757b90e172619.jpeg",
    "created_at": "2025.06.02",
    "noteUrl": "https://note.com/izuha0/n/nb9adf590fa13"
  },
  {
    "name": "読書日記 ｜ 5/5〜5/11",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/192284842/rectangle_large_type_2_b552aadacdb1b1bae54c23f83772e94b.jpeg",
    "created_at": "2025.05.26",
    "noteUrl": "https://note.com/izuha0/n/n739548248847"
  },
  {
    "name": "読書日記 ｜ 2/24〜3/2",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/190545215/rectangle_large_type_2_de2630b6a16ccfade2a924f6feed0bea.jpeg",
    "created_at": "2025.05.17",
    "noteUrl": "https://note.com/izuha0/n/n44be8db9f86a"
  },
  {
    "name": "読書日記 ｜ 2/17〜2/23",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/178233806/rectangle_large_type_2_20925133b062129da50169c66cfb9924.jpeg",
    "created_at": "2025.03.09",
    "noteUrl": "https://note.com/izuha0/n/ncfe0f9b151eb"
  },
  {
    "name": "読書日記 ｜ 1/13〜1/19",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/172650783/rectangle_large_type_2_b1519dab16b5db21b70253384b62fdbd.jpeg",
    "created_at": "2025.02.01",
    "noteUrl": "https://note.com/izuha0/n/ncda09bf61aed"
  },
  {
    "name": "読書日記 ｜ 1/6〜1/12",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/170621859/rectangle_large_type_2_e51c7311cf612fe98ca5fac950e3933b.jpeg",
    "created_at": "2025.01.18",
    "noteUrl": "https://note.com/izuha0/n/n40346f4f1696"
  },
  {
    "name": "読書日記 ｜ 12/30〜1/5",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/169924432/rectangle_large_type_2_4c6d080e46ee47cf4bdfc2a554c33f1a.jpeg",
    "created_at": "2025.01.13",
    "noteUrl": "https://note.com/izuha0/n/nc1e839af6031"
  },
  {
    "name": "読書日記 ｜ 12/23〜12/29",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/169660076/rectangle_large_type_2_11304db48d239abdea9f6b2f2ee09374.jpeg",
    "created_at": "2025.01.12",
    "noteUrl": "https://note.com/izuha0/n/n2f8e55e9b36f"
  },
  {
    "name": "読書日記 ｜ 12/2〜12/8",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/168088284/rectangle_large_type_2_12839e5289f8c20cefb3a1bcfb48b80a.jpeg",
    "created_at": "2024.12.31",
    "noteUrl": "https://note.com/izuha0/n/n413aae611017"
  },
  {
    "name": "読書日記 ｜ 11/25〜12/1",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/168047094/rectangle_large_type_2_db68c9ffc9075c9bcaee814ff08d0634.jpeg",
    "created_at": "2024.12.31",
    "noteUrl": "https://note.com/izuha0/n/nccc76833d4ec"
  },
  {
    "name": "読書日記 ｜ 11/18〜11/24",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/168046491/rectangle_large_type_2_ad519b88a6150aba28bcc5d20cce2ca1.jpeg",
    "created_at": "2024.12.31",
    "noteUrl": "https://note.com/izuha0/n/n51a6b747c162"
  },
  {
    "name": "読書日記 ｜ 11/11〜11/17",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/167991532/rectangle_large_type_2_1af418eb4d2efb98da217860aa626e37.jpeg",
    "created_at": "2024.12.31",
    "noteUrl": "https://note.com/izuha0/n/n0bcc661c53ac"
  },
  {
    "name": "読書日記  ｜ 11/4〜11/10",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/167989699/rectangle_large_type_2_7374d70c309a20b5fb804202b55631aa.jpeg",
    "created_at": "2024.12.31",
    "noteUrl": "https://note.com/izuha0/n/n86b672cd89fb"
  },
  {
    "name": "読書日記 ｜ 10/28〜11/3",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/167886402/rectangle_large_type_2_817f8babe6b4c1037c82997ec91dfd63.jpeg",
    "created_at": "2024.12.30",
    "noteUrl": "https://note.com/izuha0/n/n5892756da225"
  },
  {
    "name": "読書日記 ｜ 10/21〜10/27",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/167884806/rectangle_large_type_2_6e6de4b3ac105dbd2b0990e4a729b2c3.jpeg",
    "created_at": "2024.12.30",
    "noteUrl": "https://note.com/izuha0/n/na8d2ab619f32"
  },
  {
    "name": "読書日記 ｜ 10/14〜10/20",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/165903019/rectangle_large_type_2_e57ae97e4e72b43ecb8e1f15256787a1.jpeg",
    "created_at": "2024.12.16",
    "noteUrl": "https://note.com/izuha0/n/n37e34d7c533f"
  },
  {
    "name": "読書日記 ｜ 10/7〜10/13",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/165125151/rectangle_large_type_2_604eb3a912e33a4f2e17c9fdfab46ab7.jpeg",
    "created_at": "2024.12.09",
    "noteUrl": "https://note.com/izuha0/n/n1feec59c5153"
  },
  {
    "name": "読書日記 ｜ 9/30〜10/6",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/163125714/rectangle_large_type_2_7f3642c05e80edf0e9760d245847f3d5.jpeg",
    "created_at": "2024.11.24",
    "noteUrl": "https://note.com/izuha0/n/n1d59f732c576"
  },
  {
    "name": "読書日記 ｜ 9/23〜9/29",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/162235948/rectangle_large_type_2_913695a5fa39c2dee9fc48a13dbcf620.jpeg",
    "created_at": "2024.11.17",
    "noteUrl": "https://note.com/izuha0/n/n5b9c92d8396f"
  },
  {
    "name": "読書日記 ｜ 9/16〜9/22",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/161372267/rectangle_large_type_2_8ab153071c28d15fa16205e91dd74b31.jpeg",
    "created_at": "2024.11.10",
    "noteUrl": "https://note.com/izuha0/n/n0a966389ca65"
  },
  {
    "name": "読書日記 ｜ 9/9〜9/15",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/160439039/rectangle_large_type_2_197618484222d452b7a10785a6cbaa89.jpeg",
    "created_at": "2024.11.04",
    "noteUrl": "https://note.com/izuha0/n/n127976dcaeb2"
  },
  {
    "name": "読書日記 ｜ 9/2〜9/8",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/160437859/rectangle_large_type_2_05d16b1d2d7ba2f18679c1b05d201dd4.jpeg",
    "created_at": "2024.11.03",
    "noteUrl": "https://note.com/izuha0/n/n23aee1f16bbe"
  },
  {
    "name": "読書日記 ｜ 8/26〜9/1",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/160060478/rectangle_large_type_2_0600d4ce3c16e7363de6c8faff0d6cf1.jpeg",
    "created_at": "2024.10.31",
    "noteUrl": "https://note.com/izuha0/n/n0fe57e2ed238"
  },
  {
    "name": "読書日記 ｜ 8/19〜8/25",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/159459073/rectangle_large_type_2_0672e6a37231dc144153afaca07bdb62.jpeg",
    "created_at": "2024.10.26",
    "noteUrl": "https://note.com/izuha0/n/n62716821220d"
  },
  {
    "name": "読書日記 ｜ 8/12〜8/18",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/158715789/rectangle_large_type_2_d192ecc306af0e44193ae0c9d507768c.jpeg",
    "created_at": "2024.10.20",
    "noteUrl": "https://note.com/izuha0/n/n8f2864397ff1"
  },
  {
    "name": "読書日記 ｜ 8/5〜8/11",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/155278373/rectangle_large_type_2_a3d18bc118a3a3d1655234aa995b45ae.jpeg",
    "created_at": "2024.09.22",
    "noteUrl": "https://note.com/izuha0/n/nd9878725b5f5"
  },
  {
    "name": "読書日記 ｜ 7/29〜8/4",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/155100983/rectangle_large_type_2_7be4e9f0650d6cd35bf605beeeab6cac.jpg",
    "created_at": "2024.09.21",
    "noteUrl": "https://note.com/izuha0/n/n28fb67bd0dc9"
  },
  {
    "name": "読書日記 ｜ 7/22〜7/28",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/154604689/rectangle_large_type_2_38e43550f912ba9d9588d84a5749ebe5.jpeg",
    "created_at": "2024.09.17",
    "noteUrl": "https://note.com/izuha0/n/nd9dccd8616a3"
  },
  {
    "name": "読書日記 ｜ 7/15〜7/21",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/154438460/rectangle_large_type_2_a4bf4f6fe38701b265ca95ccc796fb11.jpeg",
    "created_at": "2024.09.15",
    "noteUrl": "https://note.com/izuha0/n/nfbbf447227b6"
  },
  {
    "name": "読書日記 ｜ 7/8〜7/14",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/152809545/rectangle_large_type_2_e7d15bd76f961f827be2280ae649b98d.jpeg",
    "created_at": "2024.09.06",
    "noteUrl": "https://note.com/izuha0/n/naf8c1dc59b0e"
  },
  {
    "name": "読書日記 ｜ 7/1〜7/7",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/151937793/rectangle_large_type_2_2c89318a27ee2e46e5861eeed0004e95.jpeg",
    "created_at": "2024.08.25",
    "noteUrl": "https://note.com/izuha0/n/nf9b148f406ac"
  },
  {
    "name": "読書日記 ｜ 6/24〜6/30",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/151179896/rectangle_large_type_2_7eee8affdfeaa855f08c40e9ec43866f.jpeg",
    "created_at": "2024.08.20",
    "noteUrl": "https://note.com/izuha0/n/nbba5392ef2b5"
  },
  {
    "name": "読書日記 ｜ 6/17〜6/23",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/151179426/rectangle_large_type_2_a14a13c246328e6edb934aa0958789ba.jpeg",
    "created_at": "2024.08.18",
    "noteUrl": "https://note.com/izuha0/n/nee57dac6b52d"
  },
  {
    "name": "読書日記 ｜ 6/10〜6/16",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/151072790/rectangle_large_type_2_087e90c8fa31a24be64c4adf1d33f6ef.jpeg",
    "created_at": "2024.08.17",
    "noteUrl": "https://note.com/izuha0/n/n4f8aeffb6bf2"
  },
  {
    "name": "読書日記 ｜ 6/3〜6/9",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/150904754/rectangle_large_type_2_bc43ba026976a9465df16a9cf87917eb.jpeg",
    "created_at": "2024.08.16",
    "noteUrl": "https://note.com/izuha0/n/na5f5b923e260"
  },
  {
    "name": "読書日記 ｜ 5/27〜6/2",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/148711242/rectangle_large_type_2_d06448c471d234682d4df48f20f07400.jpeg",
    "created_at": "2024.08.04",
    "noteUrl": "https://note.com/izuha0/n/n5502f6a0954b"
  },
  {
    "name": "読書日記 ｜ 5/20〜5/26 ",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/148710782/rectangle_large_type_2_39548253261ba119aa31ce57345788cf.jpeg",
    "created_at": "2024.07.27",
    "noteUrl": "https://note.com/izuha0/n/ne8a954e3e164"
  },
  {
    "name": "読書日記 ｜ 5/13〜5/19",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/147951665/rectangle_large_type_2_6d168c9da9154360cd1397c7f6b86afe.jpeg",
    "created_at": "2024.07.20",
    "noteUrl": "https://note.com/izuha0/n/n100478fe947c"
  },
  {
    "name": "読書日記 ｜ 5/6〜5/12",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/147291447/rectangle_large_type_2_9aea6023d699bd814581431d30596528.jpeg",
    "created_at": "2024.07.14",
    "noteUrl": "https://note.com/izuha0/n/n85391cf24d5b"
  },
  {
    "name": "読書日記 ｜ 4/29〜5/5",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/146476144/rectangle_large_type_2_8bb915d580ba035c0d4f5603e7b9fdd0.jpeg",
    "created_at": "2024.07.07",
    "noteUrl": "https://note.com/izuha0/n/n538963e232d8"
  },
  {
    "name": "読書日記 ｜ 4/22〜4/28",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/146475003/rectangle_large_type_2_60d16c0e7eb2174cecd40f2ff4ec3554.jpeg",
    "created_at": "2024.07.07",
    "noteUrl": "https://note.com/izuha0/n/na18e7a77445a"
  },
  {
    "name": "読書日記 ｜ 4/15〜4/21",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/146360576/rectangle_large_type_2_733574d0f965b2ec4405e3564752eca3.jpeg",
    "created_at": "2024.07.06",
    "noteUrl": "https://note.com/izuha0/n/n9c129275ff18"
  },
  {
    "name": "島根県隠岐郡海士町　Entô",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/144624683/rectangle_large_type_2_333f8118a9bd64103c68e1e7c76322d1.jpeg",
    "created_at": "2024.06.22",
    "noteUrl": "https://note.com/izuha0/n/nc9a1cdcfdb1c"
  },
  {
    "name": "読書日記 ｜ 4/8〜4/14",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/140243822/rectangle_large_type_2_5b1a86b6db2b85437ceffbc72af8ed6e.jpeg",
    "created_at": "2024.05.14",
    "noteUrl": "https://note.com/izuha0/n/n15cc3bcff2d9"
  },
  {
    "name": "読書日記 ｜ 4/1〜4/7",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/139561860/rectangle_large_type_2_c273f5cc33597844bbc221c31b7fd7cb.jpeg",
    "created_at": "2024.05.05",
    "noteUrl": "https://note.com/izuha0/n/n537920cd26c9"
  },
  {
    "name": "読書日記 ｜ 3/25〜3/31",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/139028817/rectangle_large_type_2_4253d449646364b3f579cacdce4aa64b.jpg",
    "created_at": "2024.04.30",
    "noteUrl": "https://note.com/izuha0/n/n2a8f22ece048"
  },
  {
    "name": "たのしいのに、生きたくないとはどういう状態だろうか。",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/138512283/rectangle_large_type_2_46310a4c39c75920e7a0cab41acc29c7.png",
    "created_at": "2024.04.26",
    "noteUrl": "https://note.com/izuha0/n/n924a91eb46ae"
  },
  {
    "name": "読書日記 ｜ 3/11〜3/17",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/137977370/rectangle_large_type_2_a6aa6233dee9a5a031146815986fcd6b.jpeg",
    "created_at": "2024.04.21",
    "noteUrl": "https://note.com/izuha0/n/nb979b8ba4b4f"
  },
  {
    "name": "わすれられてるもの｜ 写真",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/137276728/rectangle_large_type_2_9580261ca00d46361c424aece158f2a2.jpeg",
    "created_at": "2024.04.14",
    "noteUrl": "https://note.com/izuha0/n/n75c6fd6d15bf"
  },
  {
    "name": "読書日記 ｜ 3/4〜3/10",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/136757361/rectangle_large_type_2_fb2d2e248e6f0a7309b54c1dde49a069.jpeg",
    "created_at": "2024.04.09",
    "noteUrl": "https://note.com/izuha0/n/n0e65711d40f8"
  },
  {
    "name": "読書日記 ｜ 2/26〜3/3",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/136017382/rectangle_large_type_2_047b507c77f4101e0a700f3f0d50bf0d.jpeg",
    "created_at": "2024.04.03",
    "noteUrl": "https://note.com/izuha0/n/n135cdb199c9c"
  },
  {
    "name": "2024年の抱負",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/130236284/rectangle_large_type_2_ed106fff8296f91aeeb6e3409dccc1af.png",
    "created_at": "2024.02.03",
    "noteUrl": "https://note.com/izuha0/n/n25f822e17096"
  },
  {
    "name": "読書日記　12/25〜12/31",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126739592/rectangle_large_type_2_d0e8bee38b964ea893ea0a2c47e37746.png",
    "created_at": "2024.01.03",
    "noteUrl": "https://note.com/izuha0/n/ned10be8edcc5"
  },
  {
    "name": "読書日記 ｜ 12/18〜12/24",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126496666/rectangle_large_type_2_a13570412eb55690572a86bec4182851.png",
    "created_at": "2024.01.02",
    "noteUrl": "https://note.com/izuha0/n/nc0cfd1b60478"
  },
  {
    "name": "読書日記 ｜ 12/11〜12/17",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126448144/rectangle_large_type_2_ce9ed683c037e076d1d960760be33a66.png",
    "created_at": "2024.01.02",
    "noteUrl": "https://note.com/izuha0/n/nda95876e69ab"
  },
  {
    "name": "読書日記 ｜ 12/4〜12/10",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126264907/rectangle_large_type_2_d41eb5c535bb298545c0e7f2d76aeae4.png",
    "created_at": "2023.12.31",
    "noteUrl": "https://note.com/izuha0/n/nf91d9f2bc684"
  },
  {
    "name": "読書日記 ｜ 11/27〜12/3",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126214708/rectangle_large_type_2_fb0acfe86f7b95b3ed572e43bfd1dd74.png",
    "created_at": "2023.12.31",
    "noteUrl": "https://note.com/izuha0/n/n458b82fe4557"
  },
  {
    "name": "読書日記 ｜ 11/20〜11/26",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126185383/rectangle_large_type_2_e8a5f411cc4968398086040d9a6fd0f5.png",
    "created_at": "2023.12.31",
    "noteUrl": "https://note.com/izuha0/n/n5e3a786dde0a"
  },
  {
    "name": "読書日記 ｜ 11/13〜11/19",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126112976/rectangle_large_type_2_0497009a12ecd1ca2ca41c7885fbe508.png",
    "created_at": "2023.12.30",
    "noteUrl": "https://note.com/izuha0/n/n973c77b3048a"
  },
  {
    "name": "読書日記 ｜ 11/6〜11/13",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126070796/rectangle_large_type_2_e247ee57a3bc682d0c9b55a8abebaae6.png",
    "created_at": "2023.12.28",
    "noteUrl": "https://note.com/izuha0/n/n51784be653a9"
  },
  {
    "name": "読書日記 ｜ 10/30〜11/5",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/126052997/rectangle_large_type_2_09ed6757a953f364881789ba0006760d.png",
    "created_at": "2023.12.09",
    "noteUrl": "https://note.com/izuha0/n/nc742077d1ef9"
  },
  {
    "name": "読書日記 ｜ 10/23〜10/29",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/124066278/rectangle_large_type_2_a5f602e9063d0323e096ff401ad79b47.jpeg",
    "created_at": "2023.12.02",
    "noteUrl": "https://note.com/izuha0/n/n927ec03576de"
  },
  {
    "name": "読書日記 ｜ 10/16〜10/22",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/123362050/rectangle_large_type_2_791ed52a5406772e7fb6ee7bd2306128.png",
    "created_at": "2023.11.25",
    "noteUrl": "https://note.com/izuha0/n/n6982163b951f"
  },
  {
    "name": "読書日記 ｜ 10/9〜10/15",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/123332245/rectangle_large_type_2_725813ea3d1c562ba05ab76b0060c9d8.png",
    "created_at": "2023.11.25",
    "noteUrl": "https://note.com/izuha0/n/nd8d06100c2f3"
  },
  {
    "name": "読書日記 ｜ 10/2〜10/8",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/122783124/rectangle_large_type_2_d76702983a7d3772281f036b4c3d7b8e.png",
    "created_at": "2023.11.23",
    "noteUrl": "https://note.com/izuha0/n/n4e82b73bede9"
  },
  {
    "name": "読書日記 ｜ 9/25〜10/1",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/122657859/rectangle_large_type_2_b8bec86b7d5261b2415a63b61997ee61.png",
    "created_at": "2023.11.18",
    "noteUrl": "https://note.com/izuha0/n/n196fe1d7e3a2"
  },
  {
    "name": "読書日記 ｜ 9/18〜9/24",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/122038862/rectangle_large_type_2_c917b11338a5853ec24e6e211e1164d3.jpeg",
    "created_at": "2023.11.18",
    "noteUrl": "https://note.com/izuha0/n/n241f4604371c"
  },
  {
    "name": "読書日記 ｜ 9/11〜9/17",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/122023411/rectangle_large_type_2_c878160d54fdaf0d4815edc0e26ba717.jpeg",
    "created_at": "2023.11.12",
    "noteUrl": "https://note.com/izuha0/n/na3c7fd1bff0b"
  },
  {
    "name": "読書日記 ｜ 9/4〜9/10",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/121550103/rectangle_large_type_2_90277f60e4e98d3dd91c14c797f70a2a.jpeg",
    "created_at": "2023.11.04",
    "noteUrl": "https://note.com/izuha0/n/neca95a91b63f"
  },
  {
    "name": "読書日記 8/28〜9/3",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/121415139/rectangle_large_type_2_90f319a2482b8fcf6e8d6776108380e6.jpeg",
    "created_at": "2023.11.04",
    "noteUrl": "https://note.com/izuha0/n/n01dc5d1356a1"
  },
  {
    "name": "読書日記 ｜ 8/14〜8/27",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/118457127/rectangle_large_type_2_6ef5a67a2b6f4965513c1674d371f65e.png",
    "created_at": "2023.09.17",
    "noteUrl": "https://note.com/izuha0/n/n75b591d621a4"
  },
  {
    "name": "読書日記 ｜ 8/7〜8/13",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/117006827/rectangle_large_type_2_1fc5b903f32794659e1b3ab1e0d6e74e.png",
    "created_at": "2023.09.09",
    "noteUrl": "https://note.com/izuha0/n/n6571a7da50e4"
  },
  {
    "name": "読書日記 ｜ 7/31〜8/6",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/115854522/rectangle_large_type_2_6151a5dd59afca5ee86b6b119edba8f6.png",
    "created_at": "2023.08.29",
    "noteUrl": "https://note.com/izuha0/n/n02c9b69c3101"
  },
  {
    "name": "読書日記 ｜ 7/24〜7/30",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/114740764/rectangle_large_type_2_33e09eecca181b011fb4a3ec1c1f18e6.jpeg",
    "created_at": "2023.08.13",
    "noteUrl": "https://note.com/izuha0/n/na3d0b4c11da6"
  },
  {
    "name": "読書日記 ｜ 7/17〜7/23",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/112732684/rectangle_large_type_2_c7f40449a3c4413d902ec52575f456e2.png",
    "created_at": "2023.08.06",
    "noteUrl": "https://note.com/izuha0/n/n4566ee04d647"
  },
  {
    "name": "読書日記 ｜ 7/10〜7/16",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/112691790/rectangle_large_type_2_0a8def4bbe80b62a2fafa26289888907.png",
    "created_at": "2023.08.06",
    "noteUrl": "https://note.com/izuha0/n/nac69da17515d"
  },
  {
    "name": "読書日記 ｜ 7/3 ~ 7/9",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/112682512/rectangle_large_type_2_307a2fb591b13dcd7efdd2d08a8d3619.png",
    "created_at": "2023.07.31",
    "noteUrl": "https://note.com/izuha0/n/nc3057895b1d8"
  },
  {
    "name": "読書日記 ｜ 6/26 〜 7/2",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/111315595/rectangle_large_type_2_ca4991d48ced2120397b7e033872b7e8.jpeg",
    "created_at": "2023.07.20",
    "noteUrl": "https://note.com/izuha0/n/nf3e739c372e2"
  },
  {
    "name": "読書日記 ｜ 6/19 ~ 6/25",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/110947257/rectangle_large_type_2_b7374c753ce0e111cb9ca16fc70b0131.png",
    "created_at": "2023.07.09",
    "noteUrl": "https://note.com/izuha0/n/nee746020f0e0"
  },
  {
    "name": "読書日記 #11",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/101610313/rectangle_large_type_2_02abeb06f1dc9898a1ab88fa7df238fc.png",
    "created_at": "2023.03.28",
    "noteUrl": "https://note.com/izuha0/n/n31bee5614235"
  },
  {
    "name": "読書日記 #13",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/102930015/rectangle_large_type_2_d76c4e614f4db2ad0ae0a1ae58cf977b.png",
    "created_at": "2023.04.08",
    "noteUrl": "https://note.com/izuha0/n/n6429c90b03bc"
  },
  {
    "name": "読書日記 ｜ 6/12 ~ 6/18",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/109444605/rectangle_large_type_2_03ded28e4c3ae4e6e9ed993c40c207e5.jpeg",
    "created_at": "2023.06.21",
    "noteUrl": "https://note.com/izuha0/n/nc23fa1b80eca"
  },
  {
    "name": "読書日記 ｜ 6/5 ~ 6/11",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/108831552/rectangle_large_type_2_8bc8c99519da84dc485cd9611d040683.png",
    "created_at": "2023.06.10",
    "noteUrl": "https://note.com/izuha0/n/n1a221ca29c12"
  },
  {
    "name": "読書日記 ｜ 5/29 ~ 6/4 ",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/107839060/rectangle_large_type_2_1aa0ccec24447b08f39f9468b1f74671.png",
    "created_at": "2023.06.10",
    "noteUrl": "https://note.com/izuha0/n/ne0b87797e8c2"
  },
  {
    "name": "読書日記#19 （5/22~） 陰翳礼讃など",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/107833367/rectangle_large_type_2_db93ee5ef230797919871ea6b0f265ee.png",
    "created_at": "2023.06.09",
    "noteUrl": "https://note.com/izuha0/n/n81e7cf1be868"
  },
  {
    "name": "読書日記 #18",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/106556087/rectangle_large_type_2_ec8f55015bbd40e9984b818b47bc62ca.png",
    "created_at": "2023.05.24",
    "noteUrl": "https://note.com/izuha0/n/n9244c6066ad1"
  },
  {
    "name": "読書日記 #17",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/105740211/rectangle_large_type_2_ec87cdeec0c0ee90f3d1af5fae2d43cb.png",
    "created_at": "2023.05.11",
    "noteUrl": "https://note.com/izuha0/n/n4f170212e797"
  },
  {
    "name": "読書日記 #16（4/24 ~ 4/30）",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/105317855/rectangle_large_type_2_98645a5f26184e31e07de666ab9bb825.png",
    "created_at": "2023.04.30",
    "noteUrl": "https://note.com/izuha0/n/n1fcfa763856d"
  },
  {
    "name": "読書日記 #15",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/104322568/rectangle_large_type_2_5c9007cc84c34aaba2c2e6c0f23afc34.png",
    "created_at": "2023.04.24",
    "noteUrl": "https://note.com/izuha0/n/n5e23251600c9"
  },
  {
    "name": "読書日記 #14",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/103674748/rectangle_large_type_2_3a6328c71426b4748ca5222beb260f67.png",
    "created_at": "2023.04.16",
    "noteUrl": "https://note.com/izuha0/n/n7b7a9c50e21f"
  },
  {
    "name": "音楽と生命、読みながら。 Ryuichi Sakamoto",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/102462449/rectangle_large_type_2_406d5d241381134b35be12912f267952.jpeg",
    "created_at": "2023.04.08",
    "noteUrl": "https://note.com/izuha0/n/na550c0379be1"
  },
  {
    "name": "読書日記 #12",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/102374442/rectangle_large_type_2_6366eeceeeffd13288d915420ec8b784.png",
    "created_at": "2023.04.06",
    "noteUrl": "https://note.com/izuha0/n/n1da333f1f03a"
  },
  {
    "name": "読書日記 #10",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/101401715/rectangle_large_type_2_a7a8256ece40693abb22efd2251d3710.png",
    "created_at": "2023.03.18",
    "noteUrl": "https://note.com/izuha0/n/n1ac18f4711bb"
  },
  {
    "name": "読書日記 #9",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/100271326/rectangle_large_type_2_3698dc07f604dc251bbcd13fc6bd4544.png",
    "created_at": "2023.03.12",
    "noteUrl": "https://note.com/izuha0/n/n1577f1123e1d"
  },
  {
    "name": "読書日記 #8",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/100272006/rectangle_large_type_2_f8f5559ff97c531d7f20165a897f978c.png",
    "created_at": "2023.03.12",
    "noteUrl": "https://note.com/izuha0/n/n1fbb73276fd2"
  },
  {
    "name": "読書日記 #7",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/98869106/rectangle_large_type_2_93400f4847d66e2e43d06f679989e221.png",
    "created_at": "2023.02.25",
    "noteUrl": "https://note.com/izuha0/n/n596d8822973c"
  },
  {
    "name": "読書日記 #6",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/98866306/rectangle_large_type_2_4eed8d5854eb273ef519a4ff75e62273.png",
    "created_at": "2023.02.18",
    "noteUrl": "https://note.com/izuha0/n/n6f0ebb9fe0db"
  },
  {
    "name": "読書日記 #5",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/98059988/rectangle_large_type_2_5674aea19f1196915c7a4201376d5e46.png",
    "created_at": "2023.02.15",
    "noteUrl": "https://note.com/izuha0/n/n9c2da591c7b4"
  },
  {
    "name": "読書日記 #4",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/97308965/rectangle_large_type_2_5664bf82aef793c1d6d26d325481bc17.png",
    "created_at": "2023.02.05",
    "noteUrl": "https://note.com/izuha0/n/n614a67fac226"
  },
  {
    "name": "読書日記 #3",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/96876473/rectangle_large_type_2_0d1cc60a4b0f78315a8d67fbd8b457b6.png",
    "created_at": "2023.01.28",
    "noteUrl": "https://note.com/izuha0/n/n8b8a175d97ce"
  },
  {
    "name": "読書日記 #2",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/96272397/rectangle_large_type_2_6752329a3b0080fadb39633f8433a8a1.png",
    "created_at": "2023.01.22",
    "noteUrl": "https://note.com/izuha0/n/n988f79d0435d"
  },
  {
    "name": "読書日記 #1",
    "eyecatch": "https://assets.st-note.com/production/uploads/images/95807325/rectangle_large_type_2_47144145a387ce2c9f927ea9d174038c.png",
    "created_at": "2023.01.15",
    "noteUrl": "https://note.com/izuha0/n/nb50172bbf356"
  }
];

function groupByYear(data) {
  const grouped = {};
  data.forEach(item => {
    const year = item.created_at.slice(0, 4);
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });
  return Object.entries(grouped)
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => b.created_at.localeCompare(a.created_at)),
    }));
}

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;

const EyecatchGrid = () => {
  const grouped = groupByYear(eyecatchData);

  const [visibleCount, setVisibleCount] = useState(
    Object.fromEntries(grouped.map(({ year }) => [year, INITIAL_COUNT]))
  );
  const [loadMoreInfo, setLoadMoreInfo] = useState({ year: null, from: 0, to: 0 });

  const handleLoadMore = (year) => {
    const prev = visibleCount[year] ?? INITIAL_COUNT;
    const next = prev + LOAD_MORE_COUNT;
    setVisibleCount(v => ({ ...v, [year]: next }));
    setLoadMoreInfo({ year, from: prev, to: next });
  };

  const gridItems = [];
  grouped.forEach(({ year, items }) => {
    gridItems.push({ type: 'year', year, key: `year-${year}` });
    const count = visibleCount[year] ?? INITIAL_COUNT;
    const visibleItems = items.slice(0, count);
    visibleItems.forEach((item, idx) => {
      let animate = false;
      let animateIdx = 0;
      if (
        loadMoreInfo.year === year &&
        idx >= loadMoreInfo.from &&
        idx < loadMoreInfo.to
      ) {
        animate = true;
        animateIdx = idx - loadMoreInfo.from;
      }
      gridItems.push({ type: 'item', ...item, key: item.noteUrl, animate, animateIdx });
    });
    if (count < items.length) {
      gridItems.push({ type: 'loadmore', year, key: `loadmore-${year}` });
    }
  });

  const CARD_HEIGHT = 80;
  const CARD_MAX_HEIGHT = 80;

  return (
    <section className="w-full bg-white py-12">
      <div id="book-diary" style={{ height: '5rem', marginTop: '-5rem' }}></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jp text-matte tracking-wider mb-6 mt-0">
          読書の日記
        </h2>
        <div className="w-fit mx-0 text-base md:text-lg text-gray-500 leading-7 font-jp mb-2">
          <p>
            日々の読書やエッセイ、日記を通して、さまざまな本と出会ってきました。<br />
            ここに並ぶのは、わたしの思考や感性を形作ってきた本たちの記録です。<br />
            写真をクリックすると、noteの記事に移動します。
          </p>
        </div>
      </div>
      <div className="w-full px-0">
        <div
          className="
            grid
            grid-cols-4
            sm:grid-cols-6
            md:grid-cols-8
            gap-x-0.5
            gap-y-6
          "
          style={{ width: '100%' }}
        >
          {gridItems.map((item) => {
            if (item.type === 'year') {
              return (
                <div
                  key={item.key}
                  className="
                    flex items-center justify-center
                    aspect-[4/3]
                    w-full
                    border border-transparent
                    bg-white
                    text-base md:text-lg font-bold text-black
                    font-jp
                    select-none
                    tracking-widest
                  "
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: 0,
                    height: `${CARD_HEIGHT}px`,
                    maxHeight: `${CARD_MAX_HEIGHT}px`,
                    pointerEvents: 'none',
                    boxShadow: 'none',
                    background: 'white',
                    letterSpacing: '0.08em',
                  }}
                  aria-label={item.year}
                >
                  {item.year}
                </div>
              );
            }
            if (item.type === 'loadmore') {
              return (
                <button
                  key={item.key}
                  onClick={() => handleLoadMore(item.year)}
                  className="
                    flex flex-col items-center justify-center
                    aspect-[4/3]
                    w-full
                    border border-transparent
                    bg-white
                    text-xs md:text-sm text-gray-400
                    font-jp
                    transition
                    cursor-pointer
                    group
                  "
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: 0,
                    height: `${CARD_HEIGHT}px`,
                    maxHeight: `${CARD_MAX_HEIGHT}px`,
                  }}
                  aria-label="Load more"
                >
                  <span
                    className="
                      inline-flex items-center gap-1 pb-0.5
                      wavy-underline group-hover:wavy-underline
                      text-gray-400 group-hover:text-black
                    "
                    style={{
                      transition: 'text-decoration-color 0.2s',
                    }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 20 20" className="inline-block align-middle" aria-hidden="true">
                      <path d="M10 4v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Load more…
                  </span>
                </button>
              );
            }
            // 通常の写真カード
            return (
              <a
                key={item.key}
                href={item.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block relative${item.animate ? " fade-in" : ""}`}
                style={{
                  textDecoration: 'none',
                  animationDelay: item.animate ? `${item.animateIdx * 440}ms` : undefined, // さらに遅く
                }}
              >
                <div
                  className="
                    aspect-[4/3]
                    w-full
                    overflow-hidden
                    border border-gray-200
                    group-hover:border-black
                    transition-all duration-200
                    bg-gray-100
                    rounded-none
                  "
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: 0,
                    height: `${CARD_HEIGHT}px`,
                    maxHeight: `${CARD_MAX_HEIGHT}px`,
                  }}
                >
                  <img
                    src={item.eyecatch}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    style={{
                      borderRadius: 0,
                      height: '100%',
                      width: '100%',
                      aspectRatio: '4/3',
                    }}
                  />
                  {/* ホバー時に日付・タイトルをオーバーレイ表示 */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-black/0 group-hover:bg-black/40 transition-all duration-200">
                    <div className="opacity-0 group-hover:opacity-100 px-1 pb-1 transition-opacity duration-200">
                      <div className="text-[10px] md:text-xs text-gray-100 font-jp">{item.created_at}</div>
                      <div className="text-xs md:text-sm text-white font-jp truncate">{item.name}</div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      {/* アニメーション用CSS */}
      <style>{`
        .fade-in {
          opacity: 0;
          /* transform: translateY(32px) scale(0.98); ← 段差を消すため削除 */
          animation: fadeInUp 2.4s cubic-bezier(.4,2,.3,1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            /* transform: none; ← 段差を消すため削除 */
          }
        }
      `}</style>
    </section>
  );
};

export default EyecatchGrid;
