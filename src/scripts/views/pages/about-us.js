const AboutUs = {
  async render() {
    return `
    <div class="teamMember">
    <!-- <img src="../public/images/image1.jpg" alt="Ahmad Razi"/> -->
        <img src="../images/image1.jpg"/>
        <p>Ahmad Razi</p>
        <p>Mahasiswa jurusan Sistem Informasi dari UPN Veteran Jakarta, akhir - akhir ini saya tertarik dengan web development dan saya sudah 
            mencoba belajar menggunakan html, css dan sedikit JavaScript</p>
        <p>Kesibukan: Saat ini mengikuti program MSIB dari dicoding.</p>
        <p>Learning: Front End dan Back End Web Development</p>
        <p>Hobby: Main game dan baca komik</p>
    </div>
    
    <div class="teamMember">
        <!-- <img src="../images/image1.jpg" alt="Ahmad Razi"/> -->
            <img src="../images/image2.jpg"/>
            <p>Ela Amelia Sari</p>
            <p>Mahasiswa semester 6 program studi teknik informatika dari Universitas Singaperbangsa Karawang,
                 berasal dari kota Subang-Jawa Barat.
            </p>
            <p>Kesibukan: Saat ini mengikuti program SIB Batch 2 di Dicoding.</p>
            <p>Learning: Sedang mendalami Front End Web dan Back End</p>
            <p>Hobby: Membaca Novel</p>
        </div>
    
        <div class="teamMember">
            <!-- <img src="../images/image1.jpg" alt="Ahmad Razi"/> -->
                <img src="../images/image3.jpg"/>
                <p>Muhammad Raihan Hatim</p>
                <p>Seorang Mahasiswa Universitas Komputer Indonesia Semester 6 Jurusan Teknik Informatika. Berasal Dari Jakarta Utara</p>
                <p>Kesibukan: Saat ini sedang kuliah dan mengikuti SIB Dicoding.</p>
                <p>Learning: Sedang mendalami Back-End Web dan Front-End Web</p>
                <p>Hobby: Bermain Game dan Bermain gitar</p>
            </div>
    
            <div class="teamMember">
                <!-- <img src="../images/image1.jpg" alt="Ahmad Razi"/> -->
                    <img src="../images/image4.jpg"/>
                    <p>R. Ramdhani Purbowo</p>
                    <p>Seorang mahasiswa semester 6 di STMIK Amik Bandung, tinggal di Kota Bandung.</p>
                    <p>Kesibukan: Saat ini sedang program SIB Dicoding Academy Batch 2.</p>
                    <p>Learning: Sedang mendalami Back-End, Git source control dan JavaScript.</p>
                    <p>Hobby: Coding, Nonton Anime, Baca manga, mabar GTA V.</p>
                </div>
    `;
  },

  /*  async afterRender() {
  }, */
};

export default AboutUs;
