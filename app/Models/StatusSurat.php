<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusSurat extends Model
{
    protected $table = 'status_surat';

    protected $fillable = [
        'nama_status',
    ];

    // Jika nanti surat punya relasi ke status surat,
    // kamu bisa tambahkan relasi balik di sini,
    // misalnya satu status bisa dimiliki banyak surat:
    // public function surat()
    // {
    //     return $this->hasMany(Surat::class, 'status_surat_id');
    // }
}