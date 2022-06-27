const AboutUs = {
  async render() {
    return `
    <article>
    <section class="teamMember" tabindex="0">
        <img src="../images/image1.jpg" alt="Ahmad Razi"/>
        <p style="font-weight: bold;" tabindex="0">Ahmad Razi</p>
        <p tabindex="0">Mahasiswa jurusan Sistem Informasi dari UPN Veteran Jakarta, akhir - akhir ini saya tertarik dengan web development dan saya sudah 
            mencoba belajar menggunakan html, css dan sedikit JavaScript</p>
        <p tabindex="0">Kesibukan: Saat ini mengikuti program MSIB dari dicoding.</p>
        <p tabindex="0">Learning: Front End dan Back End Web Development</p>
        <p tabindex="0">Hobby: Main game dan baca komik</p>
    </section>
    
    <section class="teamMember" tabindex="0">
        <img src="../images/image2.jpg" alt="Ela Amelia Sari"/>
        <p style="font-weight: bold;" tabindex="0">Ela Amelia Sari</p>
        <p tabindex="0">Mahasiswa semester 6 program studi teknik informatika dari Universitas Singaperbangsa Karawang,
                 berasal dari kota Subang-Jawa Barat.
        </p>
        <p tabindex="0">Kesibukan: Saat ini mengikuti program SIB Batch 2 di Dicoding.</p>
        <p tabindex="0">Learning: Sedang mendalami Front End Web dan Back End</p>
        <p tabindex="0">Hobby: Membaca Novel</p>
    </section>
    
    <section class="teamMember" tabindex="0">
        <img src="../images/image3.jpg" alt="Muhammad Raihan Hatim"/>
        <p style="font-weight: bold;" tabindex="0">Muhammad Raihan Hatim</p>
        <p tabindex="0">Seorang Mahasiswa Universitas Komputer Indonesia Semester 6 Jurusan Teknik Informatika. Berasal Dari Jakarta Utara</p>
        <p tabindex="0">Kesibukan: Saat ini sedang kuliah dan mengikuti SIB Dicoding.</p>
        <p tabindex="0">Learning: Sedang mendalami Back-End Web dan Front-End Web</p>
        <p tabindex="0">Hobby: Bermain Game dan Bermain gitar</p>
    </section>
    
    <section class="teamMember" style="margin-bottom: 75px;"tabindex="0">
        <img src="../images/image4.jpg" alt="R. Ramdhani Purbowo"/>
        <p style="font-weight: bold;" tabindex="0">R. Ramdhani Purbowo</p>
        <p tabindex="0">Seorang mahasiswa semester 6 di STMIK Amik Bandung, tinggal di Kota Bandung.</p>
        <p tabindex="0">Kesibukan: Saat ini sedang program SIB Dicoding Academy Batch 2.</p>
        <p tabindex="0">Learning: Sedang mendalami Back-End, Git source control dan JavaScript.</p>
        <p tabindex="0">Hobby: Coding, Nonton Anime, Baca manga, mabar GTA V.</p>
    </section>
    </article>        
    `;
  },

  async afterRender() {
    document.getElementById('main').setAttribute('style', 'padding-bottom: 7px;');
  },
};

export default AboutUs;
