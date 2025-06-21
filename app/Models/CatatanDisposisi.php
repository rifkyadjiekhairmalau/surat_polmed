<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatatanDisposisi extends Model
{
    protected $table = 'catatan_disposisi';

    protected $fillable = [
        'isi_catatan',
    ];

    /**
     * Jika nanti relasi ke tabel disposisi diperlukan:
     * 
     * public function disposisi()
     * {
     *     return $this->belongsTo(Disposisi::class);
     * }
     */
}