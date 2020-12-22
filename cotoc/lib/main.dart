import 'package:cotoc/HomePage.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Cotoc',
      theme: ThemeData(backgroundColor: Colors.lightGreen),
      home: HomePage(),
    );
  }
}
