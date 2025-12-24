<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Table loginadmin
        Schema::create('loginadmin', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('role');
            $table->string('foto_profil')->nullable();
            $table->timestamps();
        });

        // Table menu
        Schema::create('menu', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->decimal('harga', 10, 2);
            $table->enum('kategori', ['makanan', 'minuman']);
            $table->integer('stok')->default(1);
            $table->string('gambar')->nullable();
            $table->timestamps();
        });

        // Table pesanan
        Schema::create('pesanan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_depan');
            $table->string('nama_belakang');
            $table->string('email');
            $table->string('telepon');
            $table->boolean('makan_ditempat')->default(false);
            $table->string('minuman_gratis')->nullable();
            $table->decimal('total_harga', 10, 2);
            $table->enum('metode_pembayaran', ['cash', 'digital']);
            $table->enum('status_pembayaran', ['pending', 'verified', 'failed', 'refunded', 'canceled'])->default('pending');
            $table->enum('status_pesanan', ['pending', 'diproses', 'selesai', 'dibatalkan'])->default('pending');
            $table->timestamp('tanggal_pesanan')->useCurrent();
            $table->timestamp('tanggal_selesai')->nullable();
            $table->timestamps();
            $table->string('transaction_token')->nullable();
            $table->string('midtrans_order_id')->nullable();
        });

        // Table detail_pesanan
        Schema::create('detail_pesanan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesanan_id')->constrained('pesanan')->onDelete('cascade');
            $table->foreignId('menu_id')->nullable()->constrained('menu')->onDelete('set null');
            $table->string('nama_menu');
            $table->decimal('harga', 10, 2);
            $table->integer('jumlah');
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_pesanan');
        Schema::dropIfExists('pesanan');
        Schema::dropIfExists('menu');
        Schema::dropIfExists('loginadmin');
    }
};
