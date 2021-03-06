import 'package:get/get.dart';
import 'package:groomzy/model/service.dart';

class ProviderTradingController extends GetxController {
  final Rx<int> _selectedIndex = 0.obs;
  final Rx<Service> _selectedService = Service(
    id: 0,
    description: '',
    duration: 0.0,
    durationUnit: '',
    inHouse: false,
    price: 0.0,
    title: '',
  ).obs;

  int get selectedIndex => _selectedIndex.value;
  set selectedIndex(int input) => _selectedIndex.value = input;

  Service get selectedService => _selectedService.value;
  set selectedService(Service input) => _selectedService.value = input;
}
