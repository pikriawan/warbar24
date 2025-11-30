<x-customer-layout>
    {{-- @push('styles')
        <link rel="stylesheet" href="/css/menu.css">
    @endpush
    <h1 class="title">Mau pesan apa hari ini?</h1>
    <form class="search-form" id="searchForm">
        <div class="input-field">
            <label class="label" for="keyword">Cari menu</label>
            <input class="input" type="search" id="keyword" name="keyword" placeholder="Tumis pare">
        </div>
        <button class="button button-primary">Cari</button>
    </form>
    <form class="filters" id="filters">
        @csrf
        <label for="filterAll" class="filter">
            <i class="bi bi-check"></i>
            <input class="filter-radio" type="radio" name="filter" id="filterAll" value="all" checked>
            Semua
        </label>
        <label for="filterFoods" class="filter">
            <i class="bi bi-check"></i>
            <input class="filter-radio" type="radio" name="filter" id="filterFoods" value="foods">
            Makanan
        </label>
        <label for="filterDrinks" class="filter">
            <i class="bi bi-check"></i>
            <input class="filter-radio" type="radio" name="filter" id="filterDrinks" value="drinks">
            Minuman
        </label>
    </form>
    @if (count($foods) > 0)
        <section class="menus" id="foods">
            <h2 class="menus-title">Makanan</h2>
            <div class="menus-list">
                @foreach ($foods as $food)
                    <div class="menu" data-name="{{ $food->name }}" data-category="food">
                        <div class="menu-body">
                            <img class="menu-image" src="{{ asset('storage/uploads/' . $food->image ) }}" alt="{{ $food->name }}">
                            <h3 class="menu-title">{{ $food->name }}</h2>
                        </div>
                        <div class="menu-bottom">
                            <span class="menu-price">Rp {{ number_format($food->price, 0, ",", ".") }},-</span>
                            <button class="button button-primary button-center menu-add-button">Tambahkan</button>
                        </div>
                    </div>
                @endforeach
            </div>
            <p class="menus-empty-message" id="foodsEmptyMessage">Item tidak ditemukan</p>
        </section>
    @endif
    @if (count($drinks) > 0)
        <section class="menus" id="drinks">
            <h2 class="menus-title">Minuman</h2>
            <div class="menus-list">
                @foreach ($drinks as $drink)
                    <div class="menu" data-name="{{ $drink->name }}" data-category="drink">
                        <div class="menu-body">
                            <img class="menu-image" src="{{ asset('storage/uploads/' . $drink->image ) }}" alt="{{ $drink->name }}">
                            <h3 class="menu-title">{{ $drink->name }}</h2>
                        </div>
                        <div class="menu-bottom">
                            <span class="menu-price">Rp {{ number_format($drink->price, 0, ",", ".") }},-</span>
                            <button class="button button-primary button-center menu-add-button">Tambahkan</button>
                        </div>
                    </div>
                @endforeach
            </div>
            <p class="menus-empty-message" id="drinksEmptyMessage">Item tidak ditemukan</p>
        </section>
    @endif
    @push('scripts')
        <script src="/js/menu.js"></script>
    @endpush --}}
    <form action="/api/order" method="post">
        @csrf
        <button>Create order</button>
    </form>
</x-customer-layout>
